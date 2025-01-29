import { MdError } from 'react-icons/md'

const NotFound = () => {
  return (
    <div className='container' style={{textAlign: 'center', marginTop: '100px'}}>
        <div><h1>404</h1></div>
        <MdError size={100} />
        <p>Page Not Found</p>
        
    </div>
  )
}

export default NotFound