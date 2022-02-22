import React, { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import getAwards from '../../services/awards.services';
import findOcc from '../../utils';
import ErrorComponent from '../errorComp';
import Loading from '../loading';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AwardChart() {
  const [awards, setAwards] = useState([]);
  const [freq, setFreq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState('');
  const min = (arr) => Math.min(...arr);
  const max = (arr) => Math.max(...arr);

  useEffect(() => {
    getAwards().then((res) => {
      const occ = findOcc(res.results, 'year').sort((a, b) => a.year - b.year);

      setAwards(occ.map(({ year }) => year));
      setFreq(occ.map(({ occurrence }) => occurrence));
      setLoading(false);
    },
    (error) => {
      const message = (error.response && error.response.awards && error.response.awards.message)
        || error.message
        || error.toString();
      setLoading(false);
      setError(message);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Al Pacino Awards',
      },
    },
  };
  return (
    <div className="mx-auto pb-4" style={{ maxWidth: '500px', width: '100%' }}>
      {loading && (<Loading />)}
      {!loading && errors !== '' && (<ErrorComponent message={errors} />)}
      {!loading && awards && (
        <>
          <h2 className="text-center">
            Al Pacino Awards
            {' '}
            {min(awards)}
            {' '}
            -
            {' '}
            {max(awards)}
          </h2>
          <Doughnut
            options={options}
            data={{
              labels: [...awards],
              datasets: [
                {
                  label: '# of Frequency',
                  data: [...freq],
                  backgroundColor: randomColor({ count: freq.length, hue: 'random' }),
                  hoverBackgroundColor: randomColor({ count: freq.length, hue: 'random', luminosity: 'dark' }),
                },
              ],
            }}
          />
        </>
      )}
    </div>
  );
}
