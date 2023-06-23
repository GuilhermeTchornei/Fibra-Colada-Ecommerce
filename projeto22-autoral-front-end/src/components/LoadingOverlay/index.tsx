import { Hearts } from 'react-loader-spinner';
export default function LoadingOverlay() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
            <div className='z-auto'>
                <Hearts
                    height="100"
                    width="100"
                    color="#00a390"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
    )
}