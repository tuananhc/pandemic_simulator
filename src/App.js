import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import React, { useState, useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js';
import './App.css'
import Ring from './circle.png'

export default function RangeSlider() {
  const [population, setPopulation] = useState(50);
  const [infectedPercent, setInfectedPercent] = useState(0)
  const [contagiousRadius, setContagiousRadius] = useState(0)
  const [susceptibleRate, setSusceptibleRate] = useState(20)
  const [populationList, setPopulationList] = useState([])
  const [startDisabled, setStartDisabled] = useState(false)
  const [activeCases, setActiveCases] = useState(0)
  const [rFactor, setRFactor] = useState(0)
  const [status, setStatus] = useState([])

  function renderHealthy(id) {
    return (
      <div class='population' id={id} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img id={'ring'.concat(id)} src={Ring} style={{ width: 9.5, height: 9.5, position: 'absolute' }} />
        <div id={'healthy'.concat(id)} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00FF00' }} />
      </div>
    )
  }

  function renderInfected(id) {
    return (
      <div class='population' id={id} style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img class='ring' src={Ring} style={{ width: 9.5, height: 9.5, position: 'absolute' }} />
        <div class='infected' style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF0000' }} />
      </div>
    )
  }

  useEffect(() => {
    var pop = []
    var stats = []
    for (var i = 0; i < population; i++) {
      pop.push(i)
      if (i < Math.floor(population * infectedPercent / 100)) {
        stats.push(false)
      } else {
        stats.push(true)
      }
    }
    setStatus(stats)
    setPopulationList(pop)
  }, [population, infectedPercent])

  useEffect(() => {
    var cases = 0
    for (var i = 0; i < population; i++) {
      if (!status[i]) {
        cases++
      }
    }
    setActiveCases(cases)
  }, [status])

  useEffect(() => {
    var stop = status.every(e => e == false);
    if (stop) {
      anime.remove('.population')
      setStartDisabled(false)
    }
    const interval = setInterval(() => {
      if (startDisabled && !stop) {
        var stats = [...status]
        var coor = []
        for (var i = 0; i < population; i++) {
          var element = document.getElementById(i)
          var rect = element.getBoundingClientRect();
          coor.push([rect.top, rect.left])
        }
        if (coor.length > 0) {
          for (var i = 0; i < population; i++) {
            for (var j = 0; j < population && j != i; j++) {
              if (status[i] != status[j]) {
                var dist = Math.sqrt(Math.pow(coor[i][0] - coor[j][0], 2) + Math.pow(coor[i][1] - coor[j][1], 2))
                if (dist < 35) {
                  if (!status[i]) {
                    var el = document.getElementById('healthy'.concat(j))
                    document.getElementById('ring'.concat(j)).classList.add('ring')
                    anime({
                      targets: el,
                      background: '#FF0000',
                      duration: 1000,
                      easing: 'linear',
                    });
                    stats[j] = false
                  } else {
                    var el = document.getElementById('healthy'.concat(i))
                    document.getElementById('ring'.concat(i)).classList.add('ring')
                    anime({
                      targets: el,
                      background: '#FF0000',
                      duration: 1000,
                      easing: 'linear',
                    })
                    stats[i] = false
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

  function handleBlur() {
    if (population < 0) {
      setPopulation(0);
    } else if (population > 100) {
      setPopulation(100);
    }
  }

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
        return anime.random(-75, 75);
      },
      translateY: function () {
        return anime.random(-75, 75);
      },
      easing: 'linear',
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
        loop: true
      },
      loop: true
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', padding: 40 }}>
        <div style={{ display: 'flex', flex: 0.4, flexDirection: 'column', }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
            <text style={{ fontSize: 20 }}># Active cases: {activeCases}</text>
          </div>
          <div class='border' style={{ border: '3px solid black', width: 390, height: 390, flexWrap: 'wrap', flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'start', padding: 80 }}>
            {populationList.map((id) => {
              if (id < Math.floor(population * infectedPercent / 100)) {
                return (renderInfected(id))
              } else {
                return (renderHealthy(id))
              }
            })}
          </div>
          <div>

          </div>

          <text style={{ marginTop: 10, fontSize: 20 }}>R={rFactor}</text>
        </div>

        <div style={{ display: 'flex', flex: 0.6, flexDirection: 'column', marginLeft: 50 }}>
          <Typography id="range-slider" gutterBottom>
            Population
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: 400 }}>
              <Slider
                value={population}
                onChange={(event, value) => setPopulation(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={169}
                disabled={startDisabled}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Input
                value={population}
                margin="dense"
                onChange={(event) => (event.target.value) ? setPopulation(event.target.value) : () => { }}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 169,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </div>
          <Typography id="range-slider" gutterBottom>
            Infected proportion (%)
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: 400 }}>
              <Slider
                value={infectedPercent}
                onChange={(event, value) => setInfectedPercent(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100}
                disabled={startDisabled}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Input
                value={infectedPercent}
                margin="dense"
                onChange={(event) => (event.target.value) ? setInfectedPercent(event.target.value) : () => { }}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </div>
          <Typography id="range-slider" gutterBottom>
            Contagious Radius (meters)
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: 400 }}>
              <Slider
                value={contagiousRadius}
                onChange={(event, value) => setContagiousRadius(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                step={0.2}
                max={5}
                disabled={startDisabled}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Input
                value={contagiousRadius}
                margin="dense"
                onChange={(event) => (event.target.value) ? setContagiousRadius(event.target.value) : () => { }}
                inputProps={{
                  step: 0.1,
                  min: 0,
                  max: 5,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </div>
          <Typography id="range-slider" gutterBottom>
            Susceptible Rate (%)
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: 400 }}>
              <Slider
                value={susceptibleRate}
                onChange={(event, value) => setSusceptibleRate(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100}
                disabled={startDisabled}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Input
                value={susceptibleRate}
                margin="dense"
                onChange={(event) => (event.target.value) ? setSusceptibleRate(event.target.value) : () => { }}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </div>
          Options:
          <div style={{ display: 'flex', flexDirection: 'row', }}>
            <div style={{ margin: 20 }}>
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
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', }}>
            <div style={{ margin: 20 }}>
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
            <div style={{ margin: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={() => {
                  anime.remove('.population')
                  setStartDisabled(false)
                }}
                disabled={!startDisabled}
              >
                Pause
              </Button>
            </div>
            <div style={{ margin: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                disabled={!startDisabled}
                onClick={() => {
                }}
              >
                Reset
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
