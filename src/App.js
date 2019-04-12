import React, { Component } from 'react'
import './App.css'
import * as ml5 from 'ml5'
import * as p5 from 'p5'

class App extends Component {
  yolo
  video
  status
  objects = []

  constructor() {
    super()
    this.state = {
      status: 'Loading...'
    }
  }

  componentDidMount() {
    this.setup()
  }

  setup() {
    p5.createCanvas(800, 600)
    this.video = p5.createCapture('VIDEO')
    this.video.size(800, 600)

    this.yolo = ml5.YOLO(this.video, this.beginDetection)

    this.video.hide()
    this.status = p5.select('#status')
  }

  beginDetection() {
    console.log(`Model loaded bro`)
    this.detect()
  }

  draw() {
    let width = 800
    let height = 600
    p5.image(this.video, 0, 0, width, height)
    this.objects.forEach((obj, i) => {
      p5.noStroke()
      p5.fill(0, 255, 0)
      p5.text(obj[i].className, obj[i].x * width, obj[i].y * height - 5)
      p5.noFill()
      p5.strokeWeight(4)
      p5.stroke(0, 255, 0)
      p5.rect(
        obj[i].x * width,
        obj[i].y * height,
        obj[i].w * width,
        obj[i].h * height
      )
    })
  }

  detect() {
    this.yolo.detect((err, results) => {
      this.objects = results
      this.detect()
    })
  }

  render() {
    return (
      <div className="App">
        <div id="status">meh!</div>
      </div>
    )
  }
}

export default App
