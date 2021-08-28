import graph0 from '../Styles/graph0.png'
import graph10 from '../Styles/graph10.png'
import graph20 from '../Styles/graph20.png'
import graph30 from '../Styles/graph30.png'
import graph40 from '../Styles/graph40.png'
import graph50 from '../Styles/graph50.png'

const Graph = (score) => {
    return (
        <div className="grafico">
                {score === 0 ? <img style={{ height: '9em', width: '35em' }} src={graph0} alt='graph' /> : null}
                {score < 11 ? <img style={{ height: '9em', width: '35em' }} src={graph10} alt='graph' /> : null}
                {score > 10 && score < 21 ? <img style={{ height: '9em', width: '35em' }} src={graph20} alt='graph' /> : null}
                {score > 20 && score < 31 ? <img style={{ height: '9em', width: '35em' }} src={graph30} alt='graph' /> : null}
                {score > 30 && score < 41 ? <img style={{ height: '9em', width: '35em' }} src={graph40} alt='graph' /> : null}
                {score > 40 && score < 51 ? <img style={{ height: '9em', width: '35em' }} src={graph50} alt='graph' /> : null}
                {score > 50 ? <img style={{ height: '9em', width: '35em' }} src={graph50} alt='graph' /> : null}
        </div>
    )
}

export default Graph