import Typography from '@material-ui/core/Typography';
import { Slider, Button, Input } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './App.css';
import Ring from './circle.png';
import { Line, defaults } from 'react-chartjs-2';

defaults.plugins.tooltip.enabled = true
defaults.scale.beginAtZero = true

export default function App() {
  const [population, setPopulation] = useState(52);
  const [infectedPercent, setInfectedPercent] = useState(0)
  const [contagiousRadius, setContagiousRadius] = useState(1)
  const [susceptibleRate, setSusceptibleRate] = useState(20)
  const [populationList, setPopulationList] = useState([])
  const [startDisabled, setStartDisabled] = useState(false)
  const [recoveryTime, setRecoveryTime] = useState(3)
  const [healthy, setHealthy] = useState([])
  const [infected, setInfected] = useState([])
  const [recovered, setRecovered] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartLabel, setChartLabel] = useState([0])
  const [prevChartData, setPrevChartData] = useState([])
  const [prevChartLabel, setPrevChartLabel] = useState([0])
  const [chartProps, setChartProps] = useState({})
  const [first, setFirst] = useState(true)

  function renderHealthy(id) {
    return (
      <div class='population' id={id} style={{ margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img id={'ring'.concat(id)} src={Ring} style={{ width: 5, height: 5, position: 'absolute' }} />
        <div id={'healthy'.concat(id)} style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#66FF33' }} />
      </div>
    )
  }

  function renderInfected(id) {
    return (
      <div class='population' id={id} style={{ margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img class='infect ring' src={Ring} style={{ width: 5, height: 5, position: 'absolute' }} />
        <div id={'infected'.concat(id)} class='infected' style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF0000' }} />
      </div>
    )
  }

  useEffect(() => {
    var pop = []
    for (var i = 0; i < population; i++) {
      pop.push(i)
    }
    setPopulationList(pop)
    setInfected(pop.slice(0, Math.floor(population * infectedPercent / 100)))
    setHealthy(pop.slice(Math.floor(population * infectedPercent / 100)))
  }, [population, infectedPercent])

  useEffect(() => {
    if (startDisabled) {
      var value = infected.slice(-1)[0]
      clear(value)
    }
  }, [infected])

  function clear(value) {
    setHealthy(healthy => healthy.filter((item) => item !== value))
    setTimeout(() => {
      var target = document.getElementById('healthy'.concat(value))
      anime({
        targets: target,
        background: '#808080',
        duration: 1000,
        easing: 'linear'
      })
      target = document.getElementById('ring'.concat(value))
      if (target !== null) {
        target.remove()
      }
      setHealthy(healthy => healthy.filter((item) => item !== value))
      setRecovered(recovered => [...recovered, value])
    }, 1000 * recoveryTime)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (startDisabled) {
        var curTime = chartLabel.slice(-1)[0]
        curTime += 1
        setChartLabel([...chartLabel, curTime])
        setChartData([...chartData, infected.length - recovered.length])
        for (var i = 0; i < healthy.length; i++) {
          for (var j = 0; j < infected.length; j++) {
            if (recovered.includes(infected[j])) {
              continue
            }
            var element1 = document.getElementById(healthy[i])
            var rect1 = element1.getBoundingClientRect();
            var element2 = document.getElementById(infected[j])
            var rect2 = element2.getBoundingClientRect();
            var dist = Math.sqrt(Math.pow(rect1.top - rect2.top, 2) + Math.pow(rect1.left - rect2.left, 2))
            if (dist < 25 * contagiousRadius) {
              var rand = Math.random() * 100
              if (rand < susceptibleRate) {
                var el = document.getElementById('healthy'.concat(healthy[i]))
                var ring = document.getElementById('ring'.concat(healthy[i]))
                if (ring !== null) {
                  ring.classList.add('ring')
                }
                anime({
                  targets: el,
                  background: '#FF0000',
                  duration: 1000,
                  easing: 'linear',
                });
                if (!infected.includes(healthy[i])) {
                  setInfected(infected => [...infected, healthy[i]])
                }
                break
              }
            }
          }
        }
      }
    }, 500)
    return () => clearInterval(interval)
  }, [startDisabled, healthy, infected, recovered])

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
        value: [1, 4 * Math.sqrt(contagiousRadius)],
        duration: 4000
      },
      opacity: {
        value: [1, 0],
        duration: 750,
        easing: 'linear',
      },
      loop: true
    })
  }

  function createChart(data, label, props) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 725 }}>
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
                  max: props.pop + 10,
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
        </div>
        <div style={{ border: '3px solid black', display: 'flex', width: 200, height: 150, flexDirection: 'column', justifyContent: 'center', paddingLeft: 10, margin: '0 0 40px 40px' }}>
          Population: {props.pop}
          <br />
          Infected proportion: {props.infected}%
          <br />
          Contagious radius: {props.radius}m
          <br />
          Susceptible Rate: {props.rate}%
          <br />
          Recovery Time: {props.time}
        </div>
      </div>
    )
  }

  const curChart = createChart(chartData, chartLabel,
    {
      'pop': population,
      'infected': infectedPercent,
      'radius': contagiousRadius,
      'rate': susceptibleRate,
      'time': recoveryTime
    })
  const prevChart = createChart(prevChartData, prevChartLabel, chartProps)

  function createSlider(name, parameter, paramfunc, maxVal, minVal, stepSize) {
    return (
      <div>
        <Typography id="range-slider" gutterBottom style={{ fontSize: 12 }}>
          {name}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 300 }}>
            <Slider
              value={parameter}
              onChange={(event, value) => paramfunc(value)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={minVal}
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
                min: minVal,
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

  function handleStart() {
    if (!startDisabled) {
      start()
      if (first) {
        setTimeout(() => {
          anime({
            targets: '.infected',
            background: '#808080',
            duration: 1000,
            easing: 'linear'
          })
          document.querySelectorAll('.infect.ring').forEach((item) => {
            item.remove()
          })
          for (var i = 0; i < Math.floor(population * infectedPercent / 100); i++) {
            setRecovered(recovered => [...recovered, i])
          }
          setFirst(false)
        }, 1000 * recoveryTime)
      }
    } else {
      anime.remove('.population')
    }
    setStartDisabled(!startDisabled)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '15px 0 0 50px' }}>
        <div style={{ width: 336 }}>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <div style={{ display: 'flex', flex: 0.5, fontSize: 14, justifyContent: 'flex-start' }}># Infected cases: {infected.length}</div>
            <div style={{ display: 'flex', flex: 0.5, fontSize: 14, justifyContent: 'flex-end' }}># Active cases: {infected.length - recovered.length}</div>
          </div>
          <div style={{ border: '3px solid black', width: 200, height: 200, flexWrap: 'wrap', flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 65, marginBottom: 20 }}>
            {populationList.map((id) => {
              if (id < Math.floor(population * infectedPercent / 100)) {
                return (renderInfected(id))
              } else {
                return (renderHealthy(id))
              }
            })}
          </div>
          {createSlider('Population', population, setPopulation, 169, 1)}
          {createSlider('Infected proportion (%)', infectedPercent, setInfectedPercent, 100, 0, 1)}
          {createSlider('Contagious Radius (meters)', contagiousRadius, setContagiousRadius, 2, 1, 0.05)}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 350, height: 80, }}>
            <div style={{ height: 7.5, width: 7.5, borderRadius: 7.5, backgroundColor: 'red' }} />
            <img src={Ring} style={{ height: contagiousRadius * 25 + 5, width: contagiousRadius * 25 + 5, position: 'absolute' }} />
          </div>
          {createSlider('Susceptible Rate (%)', susceptibleRate, setSusceptibleRate, 100, 0, 1)}
          {createSlider('Recovery time (units of time)', recoveryTime, setRecoveryTime, 10, 1, 1)}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                  onClick={() => handleStart()}
                >
                  {(!startDisabled) ? 'Start' : 'Pause'}
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
                      setContagiousRadius(1)
                      setRecoveryTime(3)
                    }, 100)
                    if (chartData.length > 0) {
                      setChartData([])
                      setChartLabel([0])
                      setStartDisabled(false)
                      var data = [...chartData]
                      var label = [...chartLabel]
                      var props = {
                        'pop': population,
                        'infected': infectedPercent,
                        'radius': contagiousRadius,
                        'rate': susceptibleRate,
                        'time': recoveryTime
                      }
                      setPrevChartData(data)
                      setPrevChartLabel(label)
                      setChartProps(props)
                    }
                    setFirst(true)
                    setRecovered([])
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 20, marginLeft: 60 }}>
          {curChart}
          {(prevChartData.length) ? (
            <div>
              <div style={{ margin: 40, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                Previous model
              </div>
              {prevChart}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}