import { Chart as ChartJS, plugins } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const logScale = [1, 2, 3, 4, 5, 7, 10, 15, 23, 33, 50];

function LineChart({ data, legend, color = '#1791e8', deafultSmoothness = Math.floor(logScale.length / 2) }) {
    /*
    Default line chart from chartJS with following changes:
    Added smoothness slider, removed tooltip and added custom legend
    */
    const [smoothData, setSmoothData] = useState([]);
    const [smoothness, setSmoothness] = useState(deafultSmoothness);
    const [chartOptions, setChartOptions] = useState({
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            y: {
                min: 0,
                max: 10
            },
            x: {
                display: false
            }
        },
        backgroundColor: color,
        borderColor: color,
    });

    useEffect(() => {
        let newChartOptions = structuredClone(chartOptions);
        newChartOptions.scales.y.max = Math.max(...data);
        setChartOptions(newChartOptions);
    }, [data])

    useEffect(() => {
        const sliceSize = logScale[smoothness];
        let newSmoothData = [];
        let slice, sum;

        for (let i = 0; i < Math.ceil(data.length / sliceSize); i++) {
            slice = data.slice(i * sliceSize, i * sliceSize + sliceSize);
            sum = slice.reduce((a, b) => a + b, 0);
            let avg = sum / slice.length;
            newSmoothData.push(avg);
        }

        setSmoothData(newSmoothData);
    }, [smoothness, data, deafultSmoothness])

    return (
        <>
            <h3 className="legend">{legend}</h3>
            <div className="chart-wrapper">
                {data.length < 100 ? <div className="not-enough-data">Not enough data</div> : ''}
                <Line className={data.length < 100 ? "chart no-data" : "chart"} data={{
                    labels: Array(smoothData.length).fill(''),
                    datasets: [
                        {
                            label: legend,
                            data: data.length < 100 ? Array(smoothData.length).fill('') : smoothData,
                        }
                    ],
                }} options={chartOptions} />
            </div>
            <h4 style={{color: '#3e3e3e'}}>Smoothness:</h4>
            <Slider 
                min={0}
                max={logScale.length - 1}
                value={smoothness}
                onChange={setSmoothness}
                disabled={data.length < 100}
                styles={{
                    track: {
                        backgroundColor: '#6dc2ff'
                    },
                    handle: {
                        borderColor: '#6dc2ff',
                        boxShadow: '0 0 0 0'
                    }
                }
                }
            />
        </>
    )
}

export default LineChart;