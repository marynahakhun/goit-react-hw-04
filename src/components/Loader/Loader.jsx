import { FidgetSpinner } from 'react-loader-spinner'
export default function Loader() {
    return <div>
        <FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
  />
    </div>
}