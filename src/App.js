import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import React, { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './App.css';
import Ring from './circle.png';
import { Line } from 'react-chartjs-2';

import { defaults } from 'react-chartjs-2';

// Disable animating charts by default.
defaults.plugins.tooltip.enabled = true
defaults.scale.beginAtZero = true

export default function RangeSlider() {
  const [population, setPopulation] = useState(52);
  const [infectedPercent, setInfectedPercent] = useState(0)
  const [contagiousRadius, setContagiousRadius] = useState(2)
  const [susceptibleRate, setSusceptibleRate] = useState(20)
  const [populationList, setPopulationList] = useState([])
  const [startDisabled, setStartDisabled] = useState(false)
  const [activeCases, setActiveCases] = useState(0)
  const [recoveryTime, setRecoveryTime] = useState(3)
  const [status, setStatus] = useState([])
  const [newStatus, setNewStatus] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartLabel, setChartLabel] = useState([0])
  const [prevChartData, setPrevChartData] = useState([])
  const [prevChartLabel, setPrevChartLabel] = useState([0])
  const [prevPopulation, setPrevPopulation] = useState(0)

  function renderHealthy(id) {
    return (
      <div class='population' id={id} style={{ margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img id={'ring'.concat(id)} src={Ring} style={{ width: 5, height: 5, position: 'absolute' }} />
        <div id={'healthy'.concat(id)} style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#00FF00' }} />
      </div>
    )
  }

  function renderInfected(id) {
    return (
      <div class='population' id={id} style={{ margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img class='ring' src={Ring} style={{ width: 5, height: 5, position: 'absolute' }} />
        <div id={'infected'.concat(id)} style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF0000' }} />
      </div>
    )
  }

  useEffect(() => {
    var pop = []
    var stats = []
    var rec = []
    for (var i = 0; i < population; i++) {
      pop.push(i)
      if (i < Math.floor(population * infectedPercent / 100)) {
        stats.push(false)
        rec.push(1)
      } else {
        stats.push(true)
        rec.push(0)
      }
    }
    setStatus(stats)
    setPopulationList(pop)
    setNewStatus(rec)
  }, [population, infectedPercent])

  useEffect(() => {
    var cases = 0
    for (var i = 0; i < population; i++) {
      if (!status[i]) {
        cases++
      }
    }
    setActiveCases(cases)
    if (cases === population && cases > 0) {
      anime.remove('.population')
      setStartDisabled(false)
    }
  }, [status])

  useEffect(() => {
    const interval = setInterval(() => {
      if (startDisabled) {
        var curTime = chartLabel.slice(-1)[0]
        curTime += 1
        setChartLabel([...chartLabel, curTime])
        setChartData([...chartData, activeCases])
        var stats = [...status]
        var coor = []
        for (var i = 0; i < population; i++) {
          var element = document.getElementById(i)
          var rect = element.getBoundingClientRect();
          coor.push([rect.top, rect.left])
          if (newStatus[i] === 1) {
            var index = i
            setTimeout(() => {
              var newStats = [...newStatus]
              newStats[index] = 2
              setNewStatus(newStats)
              anime({
                targets: document.getElementById('infected'.concat(index)),
                background: '#808080',
                duration: 1000,
                easing: 'linear'
              });
            }, 1000);
          }
        }
        if (coor.length > 0) {
          for (var i = 0; i < population; i++) {
            for (var j = 0; j < population && j != i; j++) {
              if (status[i] != status[j]) {
                var dist = Math.sqrt(Math.pow(coor[i][0] - coor[j][0], 2) + Math.pow(coor[i][1] - coor[j][1], 2))
                if (dist < 35) {
                  var rand = Math.random()
                  console.log(rand)
                  if (rand > susceptibleRate / 100) {
                    break
                  } else {
                    console.log(true)
                    if (!status[i]) {
                      var el = document.getElementById('healthy'.concat(j))
                      document.getElementById('ring'.concat(j)).classList.add('ring')
                      document.getElementById('ring'.concat(j)).classList.add(j)
                      anime({
                        targets: el,
                        background: '#FF0000',
                        duration: 1000,
                        easing: 'linear',
                      });
                      stats[j] = false
                      setTimeout(() => {
                        anime({
                          targets: el,
                          background: '#808080',
                          duration: 1000,
                          easing: 'linear'
                        })
                        anime({
                          targets: document.getElementsByClassName(j.toString()),
                          scale: 0.01
                        })
                      }, 3000)
                    } else {
                      var el = document.getElementById('healthy'.concat(i))
                      document.getElementById('ring'.concat(i)).classList.add('ring')
                      document.getElementById('ring'.concat(i)).classList.add(i)
                      anime({
                        targets: el,
                        background: '#FF0000',
                        duration: 1000,
                        easing: 'linear',
                      })
                      stats[i] = false
                      setTimeout(() => {
                        anime({
                          targets: el,
                          background: '#808080',
                          duration: 1000,
                          easing: 'linear'
                        })
                      }, 3000)
                    }
                  }
                }
              }
            }
          }
          setStatus(stats)
        }
      }
    }, 500)
    return () => clearInterval(interval)
  }, [startDisabled, status])

  function shuffle() {
    var currentIndex = population, temporaryValue, randomIndex;
    var pop = [...populationList]
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = pop[currentIndex];
      pop[currentIndex] = pop[randomIndex];
      pop[randomIndex] = temporaryValue;
    }
    setPopulationList(pop)
  }

  function start() {
    anime({
      targets: '.population',
      translateX: function () {
        return anime.random(-50, 50);
      },
      translateY: function () {
        return anime.random(-50, 50);
      },
      easing: 'linear',
      duration: 1000,
      complete: start
    });
    anime({
      targets: '.ring',
      scale: {
        value: [1, 4],
        duration: 5500
      },
      opacity: {
        value: [1, 0],
        duration: 1000,
        easing: 'linear',
      },
      loop: true
    })
  }

  function createChart(data, label, range) {
    return (
      <Line
        data={{
          labels: label,
          datasets: [
            {
              label: '# of infected cases',
              data: data,
              fill: {
                target: 'origin',
                above: 'rgb(255, 100, 132)',
              },
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        }}
        options={{
          animation: false,
          scales: {
            x: {
              title: {
                text: 'Unit of time',
                display: true,
                font: { size: 14 }
              },
              grid: {
                display: false
              }
            },
            y: {
              max: range + 10,
              title: {
                text: 'Infected cases',
                display: true,
                font: { size: 14 }
              },
            }
          },
          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14
                }
              }
            }
          }
        }}
      />
    )
  }

  const curChart = createChart(chartData, chartLabel, population)
  const prevChart = createChart(prevChartData, prevChartLabel, prevPopulation)

  function createSlider(name, parameter, paramfunc, maxVal, stepSize) {
    return (
      <div>
        <Typography id="range-slider" gutterBottom style={{ fontSize: 14 }}>
          {name}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 300 }}>
            <Slider
              value={parameter}
              onChange={(event, value) => paramfunc(value)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={maxVal}
              step={stepSize}
              disabled={startDisabled}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Input
              value={parameter}
              margin="dense"
              onChange={(event) => (event.target.value) ? paramfunc(event.target.value) : () => { }}
              inputProps={{
                step: stepSize,
                min: 0,
                max: maxVal,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0 0 30px', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
            <text style={{ fontSize: 14 }}># Infected cases: {activeCases}</text>
          </div>
          <div class='border' style={{ border: '3px solid black', width: 200, height: 200, flexWrap: 'wrap', flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 65, marginBottom: 40 }}>
            {populationList.map((id) => {
              if (id < Math.floor(population * infectedPercent / 100)) {
                return (renderInfected(id))
              } else {
                return (renderHealthy(id))
              }
            })}
          </div>
          {createSlider('Population', population, setPopulation, 169, 1)}
          {createSlider('Infected proportion (%)', infectedPercent, setInfectedPercent, 100, 1)}
          {createSlider('Contagious Radius (meters)', contagiousRadius, setContagiousRadius, 5, 0.1)}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 350, height: 100, }}>
            <div style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: 'red' }} />
            <img src={Ring} style={{ height: contagiousRadius * 20, width: contagiousRadius * 20, position: 'absolute' }} />
          </div>
          {createSlider('Susceptible Rate (%)', susceptibleRate, setSusceptibleRate, 100, 1)}
          {createSlider('Recovery time (units)', recoveryTime, setRecoveryTime, 10, 1)}
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={() => shuffle()}
                disabled={startDisabled}
              >
                Shuffle
              </Button>
            </div>
            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={() => {
                  setStartDisabled(true)
                  start()
                }}
                disabled={startDisabled}
              >
                Start
              </Button>
            </div>
            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={() => {
                  anime.remove('.population')
                  setPopulation(0)
                  setTimeout(() => {
                    setPopulation(52)
                    setInfectedPercent(0)
                    setSusceptibleRate(20)
                  }, 100)
                  setChartData([])
                  setChartLabel([0])
                  setStartDisabled(false)
                  // if (prevChartData.length === 0) {
                  var data = [...chartData]
                  var label = [...chartLabel]
                  var pop = population
                  setPrevChartData(data)
                  setPrevChartLabel(label)
                  setPrevPopulation(pop)
                  // }
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        <div style={{ padding: 40, width: 600 }}>
          {curChart}
          {(prevChartData.length) ? (
            <div style={{ width: 650, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              <div style={{ margin: 40 }}>Previous model</div>
              {prevChart}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}