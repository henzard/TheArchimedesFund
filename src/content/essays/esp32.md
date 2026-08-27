---
title: "AI at the Edge of a Three Dollar Chip"
description: "What AI development honestly looks like near an ESP32: what fits in 520 KB of RAM, what belongs on a server, and the latency and power trade-offs that decide the split."
date: 2026-08-27
tags: ["esp32", "embedded", "ai", "edge"]
draft: false
hero: "../../assets/essays/esp32.jpg"
heroAlt: "A breadboard prototype with an ESP32 board, coloured jumper wires and a small OLED display, on a blue fabric background."
heroCredit: "Photo by Vishnu Mohanan on Unsplash"
---

"Run AI on a microcontroller" is a sentence doing two jobs at once, and it is worth pulling them apart. One job is marketing, where it conjures a language model living on a chip that costs less than a coffee. The other is engineering, where it means something real but far smaller: a few hundred kilobytes of quantised neural network making narrow decisions locally. The second meaning is genuinely useful. The confusion between the two wastes a lot of project time.

The ESP32 is a good chip to think with here, because it is cheap, everywhere, and honestly documented. The original part gives you two Xtensa cores at up to 240 MHz, roughly 520 KB of SRAM, 2.4 GHz Wi-Fi, and Bluetooth, with program storage in external flash that is typically a few megabytes. Later variants shift the details, and the ESP32-S3 in particular adds vector instructions that help neural network arithmetic, but the shape of the constraint is stable: hundreds of kilobytes of working memory, not gigabytes. Every architectural decision follows from that number.

## What actually fits on the chip

Start with what a model costs. A network's weights have to live somewhere, and its activations need RAM while it runs. Espressif's own tooling and TensorFlow Lite for Microcontrollers both lean on 8-bit integer quantisation, which cuts a model to roughly a quarter of its 32-bit size at a modest accuracy cost. Even so, the working budget on an ESP32 is measured in tens to a few hundred kilobytes once your application, network stack, and buffers take their share.

That budget buys more than people expect, as long as the task is narrow. Wake-word detection on a one-second audio window. Classifying a vibration signature from an accelerometer as normal or anomalous. Recognising a handful of gestures. Deciding whether a low-resolution greyscale frame probably contains a person. These are classification problems over small inputs with small output spaces, and small convolutional or dense networks handle them respectably.

What does not fit is anything generative or open-ended. A language model useful enough to converse with is orders of magnitude too large, not marginally too large. No quantisation trick closes a gap that size. If your product needs open-ended reasoning, that computation happens on a server, and the honest question becomes how the microcontroller and the server should divide the work.

## The split is a latency and power question

The naive architecture streams everything to the cloud and does all inference there. It works in a demo and fails in the field, for two reasons the datasheet will happily explain.

The first is power. An ESP32 in deep sleep draws on the order of microamps. With the radio transmitting, current draw jumps by several orders of magnitude, into the range of hundreds of milliamps in bursts. For a battery-powered sensor, the radio is the most expensive component you own. An architecture that transmits continuously has already decided to be mains-powered, whatever the industrial designer had in mind.

The second is latency and availability. A round trip through Wi-Fi, the internet, and a model server takes hundreds of milliseconds on a good day and does not happen at all when the network is down. A device that cannot make its one important decision without connectivity is fragile in a way users notice.

So the pattern that actually works is a cascade: a small on-device model acts as a cheap, always-on filter, and the expensive path, radio plus server, is reserved for the rare events that justify it. The local model does not need to be very good. It needs to be good enough that "probably nothing" is trustworthy, because "probably nothing" is what it will say ninety-nine percent of the time, and every one of those times you saved a transmission.

Here is the shape of that loop, compressed to its essentials:

```cpp
void loop() {
  read_sensor_window(buffer, WINDOW_SIZE);

  // Tiny quantised model, runs in tens of milliseconds on-device
  float anomaly_score = local_model_infer(buffer);

  if (anomaly_score > THRESHOLD) {
    // Rare path: wake the radio, send the raw window
    // for the server-side model to judge properly
    wifi_connect();
    send_window_for_analysis(buffer, WINDOW_SIZE);
    wifi_disconnect();
  }

  deep_sleep(SAMPLE_INTERVAL_MS);
}
```

Everything interesting about the system lives in that threshold. Set it low and you burn the battery relaying false alarms. Set it high and the local model quietly eats events the server-side model would have caught. Choosing it is not a machine learning decision, it is a product decision about which failure costs more, and it deserves to be made by a human looking at real field data rather than defaulted in firmware.

## Where the AI tooling helps, and where it misleads

There is a second sense of "AI development and the ESP32" worth addressing: using AI assistants to write embedded code. The pattern I would expect, and the one worth guarding against, is that assistants are strong on exactly the parts of embedded work that resemble web work, and weakest where embedded is most itself.

They are genuinely good at scaffolding: FreeRTOS task boilerplate, MQTT client setup, JSON serialisation, the peripheral configuration dance. This is well-documented, heavily repeated code, and generating it saves real time.

They are unreliable precisely where the cost of error is highest. Interrupt safety, DMA buffer lifetimes, which functions are safe to call from an ISR, what actually survives deep sleep, timing constraints on a bit-banged protocol. These failures share a property: the code compiles, runs, and works most of the time. A race condition that corrupts one sample in ten thousand will sail through a demo and surface as a field failure months later. An assistant's fluency gives no signal either way, so the discipline is to treat generated embedded code as a draft from a confident junior who has never held the board: review the concurrency, check the datasheet claims, and test on hardware under realistic load, not just on the desk.

## The honest summary

The ESP32 will not run your large model, and it does not need to. Its job in an AI system is to be the cheap, low-power, always-present front line: sensing continuously, deciding locally whether anything interesting is happening, and spending its radio budget only when the answer is yes. The server's job is everything heavy, slow, and revisable.

If you are designing such a system, the two numbers to establish before writing any code are your RAM budget after the application takes its share, and your energy budget per decision. Both are measurable in an afternoon with a debug build and a multimeter, and between them they will answer most of the architectural questions that otherwise get argued about in the abstract.
