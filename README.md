# window-modal [![Build Status](https://travis-ci.org/nik-m2/window-modal.svg?branch=master)](https://travis-ci.org/nik-m2/window-modal) [![npm version](https://badge.fury.io/js/window-modal.svg)](https://badge.fury.io/js/window-modal)



<p align="center">
    A modal window element designed to be smooth, clean and user friendly.
    <br>
    Includes many features and <a href="https://github.com/nik-m2/window-modal/blob/master/docs/options.md">options</a>! 
    <br>
    <a href="https://codesandbox.io/s/yqwmql4kp9"><b>Demo</b></a>
    <br>
    <img src="https://user-images.githubusercontent.com/20328954/54089282-d78e3d00-433d-11e9-802e-5c404283cc4a.png"/>
    <br>
    Feature and improvement <a href="https://github.com/nik-m2/window-modal/issues">suggestions</a> welcome!
</p>

## Features

- Pure JS (Written in TypeScript)
- Designed to be used in vanilla JS, or wrapped by front end frameworks (React, Vue, etc)
- Highly tested
- Movable
- Resizable
- Titles (with icons)
- Minimize
- Close
- Scrollable
- Customizable style (override styles with classnames, may have to use `!important`)
- Many options!

## Setup

<details>
    <summary style="display:inline-block;">
        <b>CDN</b>
    </summary>
    <br/>

```xml
<script src="https://cdn.jsdelivr.net/npm/window-modal/build/index.js"/>
```
    
</details>

<br/>

<details open>
    <summary>
        <b>npm</b>
    </summary>
    <br/>

`npm install window-modal`

```javascript
const WindowModal = require("window-modal");
```

or

```javascript
import WindowModal from "window-modal";
```
</details>

## Usage

```
const windowModal = new WindowModal(options);
```

- [Options](https://github.com/nik-m2/window-modal/blob/master/docs/options.md)
- [WindowModal Class](https://github.com/nik-m2/window-modal/blob/master/docs/WindowModal.md)

