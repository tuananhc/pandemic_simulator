import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { useState, useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js';
import './App.css'

export default function RangeSlider() {
  const [population, setPopulation] = useState(50);
  const [infectedPercent, setInfectedPercent] = useState(0)
  const [contagiousRadius, setContagiousRadius] = useState(0)
  const [susceptibleRate, setSusceptibleRate] = useState(0)
  const [populationList, setPopulationList] = useState([])
  const [shuffleDisabled, setShuffleDisabled] = useState(false)
  const [groupDisabled, setGroupDisabled] = useState(false)
  const [startDisabled, setStartDisabled] = useState(false)
  const [resetDisabled, setResetDisabled] = useState(true)
  const [pauseDisabled, setPauseDisabled] = useState(true)
  const [activeCases, setActiveCases] = useState(0)
  const [rFactor, setRFactor] = useState(0)

  function generate(population, infectedPercent) {
    var pop = []
    for (var i = 0; i < Math.floor(population * infectedPercent / 100); i++) {
      pop.push(renderInfected())
    }
    for (var i = Math.floor(population * infectedPercent / 100); i < population; i++) {
      pop.push(renderHealthy())
    }
    setPopulationList(pop);
  }

  useEffect(() => {
    generate(population, infectedPercent)
    setActiveCases(Math.floor(population * infectedPercent / 100))
  }, [population, infectedPercent])

  function handleBlur() {
    if (population < 0) {
      setPopulation(0);
    } else if (population > 100) {
      setPopulation(100);
    }
  }

  function renderHealthy() {
    return (
      <div class='population-el' style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4aa96c', margin: 10 }} />
    )
  }

  function renderInfected() {
    return (
      <div class='population-el' style={{ margin: 10 }}>
        <div class="outer">
          <div class="inner" />
        </div>
        <div style={{ width: 10, height: 10, position: 'relative', borderRadius: '50%', backgroundColor: 'red' }} />
      </div>
    )
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
      targets: '.population-el',
      translateX: function () {
        return anime.random(0, 75);
      },
      translateY: function () {
        return anime.random(0, 75);
      },
      easing: 'easeInOutQuad',
      complete: start
    });

  }

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', padding: 40 }}>
      <div style={{ display: 'flex', flex: 0.4, flexDirection: 'column', }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <text style={{ fontSize: 20 }}># Active cases: {activeCases}</text>
        </div>
        <div style={{ border: '3px solid black', width: 390, height: 390, flexWrap: 'wrap', flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
          {populationList}
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
              disabled={shuffleDisabled}
            >
              Shuffle
          </Button>
          </div>
          <div style={{ margin: 20 }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100 }}
              disabled={groupDisabled}
              onClick={() => {
                anime({
                  targets: '.outer',
                  scale: {
                    value: 4,
                    duration: 5000,
                  },
                  opacity: {
                    value: [1, 0],
                    duration: 4000
                  },
                  loop: true,
                })
              }}
            >
              Group
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
                setShuffleDisabled(true)
                setGroupDisabled(true)
                setResetDisabled(false)
                setPauseDisabled(false)
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
                anime.remove('.population-el')
                setStartDisabled(false)
                setShuffleDisabled(false)
                setGroupDisabled(false)
                setPauseDisabled(true)
              }}
              disabled={pauseDisabled}
            >
              Pause
          </Button>
          </div>
          <div style={{ margin: 20 }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 100 }}
              onClick={() => { }}
              disabled={resetDisabled}
            >
              Reset
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
