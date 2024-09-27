import { Link } from 'react-router-dom'
import { useNavigateBack } from '../../utils'
import './About.scss'

export function About() {
    const back = useNavigateBack()

    return (
        <div className="page about">
            <header>
                <Link to={'..'} onClick={back}>
                    Back
                </Link>
            </header>
            <main>
                <h1>Messed Up Timer</h1>
                <p>
                    This timer is to be used when you want to mess up with someone. It can be used
                    as a regular timer as well, if you feel generous.
                </p>
                <hr />
                <h3>Regular Timer</h3>
                <p>
                    Regular Timer is just a regular timer. If you set it to 2 minutes, it will run
                    for 2 minutes.
                </p>
                <hr />
                <h3>Slowing Down Timer</h3>
                <p>
                    This timer starts to slow down at some point with linear interpolation. It is
                    ideal for use when you need someone to endure something for some time.
                </p>
                <h5>Example 1</h5>
                <ul>
                    <li>Slow down starts at: 66%</li>
                    <li>Slow down coeficient: 3</li>
                    <li>Set to 3 minutes</li>
                </ul>
                <p>
                    This timer will run for 4 minutes and 58 seconds. First 2 minutes will run
                    normally. Starting with 3rd minute (66%) the timer starts slowing down. The slow
                    down is linearly gradual. The closer to the end the bigger is the slow down.
                    When it gets to 30s remaining, it will run 2x as slow. This is based on 50% of
                    slowed down interval is reached so we are at 50% of the max coeficient. Getting
                    close to 0s remaining it will run 3x as slow. (1s of timer will run for 3s of
                    real time).
                </p>
                <h5>Example 2</h5>
                <ul>
                    <li>Slow down starts at: 25%</li>
                    <li>Slow down coeficient: 5</li>
                    <li>Set to 1 minute</li>
                </ul>
                <p>
                    This timer will run for 1:30 in real time. First 15s normally, then slowing down
                    by factor of 1 for each 11 seconds. 2x at 26s passed, 3x at 37s passed, 4x at
                    48s passed and then 5x when approachng 0s remaining.
                </p>
                <hr />
                <h3>Speeding Up Timer</h3>
                <p>
                    This timer starts to speed up at some point with linear interpolation. It is
                    ideal for use when you give someone a time limit to finish some task.
                </p>
                <h5>Example</h5>
                <ul>
                    <li>Speed up starts at: 50%</li>
                    <li>Speed up coeficient: 3</li>
                    <li>Set to 10 minutes</li>
                </ul>
                <p>
                    This timer will run for 8:20. The first 5 minutes will run normally and then the
                    speed up starts. When showing 7:30 passed (2:30 remaining), it will run twice as
                    fast. Close to 0s remaining it will run 3x as fast. That is each 1s of real time
                    will be 3s passed by the timer.
                </p>
                <hr />
                <h3>Lagging Timer</h3>
                <p>
                    This timer runs at normal speed when it is running that is. This timer has a
                    tendency to get stuck and not move. You can configure how often this happens as
                    well as minimal and maximal time of it being stuck.
                </p>
                <hr />
                <h3>Nearly there and back again</h3>
                <p>
                    This timer never finishes. It will run normally until certain point from the end
                    and then it will fill back up. When back at full time it will start going down
                    again and repeat the process.
                </p>
            </main>
        </div>
    )
}
