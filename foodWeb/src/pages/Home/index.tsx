import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'
import Menu from '../Components/Menu'
import { Bar, Line, Pie } from 'react-chartjs-2';

const Home = () => {
    const history = useHistory()

    const [id, setId] = useState('')

    async function getDateAsync(){
        const id = await localStorage.getItem('idUser@food')
        setId(String(id))
        if(!id){
            history.push('/login')
        }
    }
    useEffect(()=>{getDateAsync()},[])

    //date charts ------------------------------------
  const [data, setData] = useState({
    chartData:{
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets:[
        {
          label:'Population',
          data:[
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
          backgroundColor:[
            'rgba(42, 42, 42, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(200, 0, 100, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }
  })

    if(!id){return null}

    return (
        <div className="home-container">
            <Menu name={'Home'} />
            <div className="dashboard-container">
                <div className="dashboard-section">
                <Pie
                    data={data.chartData}
                    options={{ maintainAspectRatio: false }}
                    />
                </div>
                <div className="dashboard-section">
                <Bar
                    data={data.chartData}
                    options={{ maintainAspectRatio: false }}
                />
                </div>
                <div className="dashboard-section">
                <Line
                    data={data.chartData}
                    options={{ maintainAspectRatio: false }}
                    />
                </div>
                <div className="dashboard-section">
            
                </div>
            </div>
        </div>
    )
}


export default Home