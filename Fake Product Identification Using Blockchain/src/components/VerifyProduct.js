import React, {useState, useRef} from 'react'
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { useEffect } from 'react';
// import QRCode from "qrcode";
import QrScanner from 'qr-scanner';
import jsQR from 'jsqr';
import CryptoJS from 'crypto-js';

const VerifyProduct = ({ provider, central }) => {

    const [companyContractAddress, setCompanyContractAddress] = useState('');
    const [productId, setProductId] = useState('');

    const [productStatus, setProductStatus] = useState(null);
    //const [scannedData, setScannedData] = useState(null);

    // const handleScan = (data) => {
    //     setScannedData(data);
    // }

    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }

    // const handleInput1Change = (e) => {
    //     setCompanyContractAddress(e.target.value);
    //   };
    
    //   const handleInput2Change = (e) => {
    //     setProductId(e.target.value);
    //   };
    


    const checkProduct = async () => {
        try{

            const result = await central.checkProduct(companyContractAddress, parseInt(productId));
            setProductStatus(result);
        }catch(error){
            console.log(error);
            showErrorMessage(error);
        }
        
    }

    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const fileRef =useRef();

    const handleClick = () => {
        fileRef.current.click();
    };

    const handleChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = new Image();
      imageData.src = event.target.result;

      imageData.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = imageData.width;
        canvas.height = imageData.height;
        context.drawImage(imageData, 0, 0, imageData.width, imageData.height);

        const imageDataContext = context.getImageData(0, 0, imageData.width, imageData.height);
        const code = jsQR(imageDataContext.data, imageData.width, imageData.height);

        if (code) {
        // console.log(CryptoJS.AES.decrypt(code.data, "key").toString(CryptoJS.enc.Utf8))
        let str = CryptoJS.AES.decrypt(code.data, "key").toString(CryptoJS.enc.Utf8);
        // Find the last occurrence of "?"
const lastIndex = str.lastIndexOf('?');
console.log(lastIndex);
// Separate the string into two parts
if(lastIndex != -1)
{let beforeQuestionMark = str.slice(0, lastIndex);
let afterQuestionMark = str.slice(lastIndex + 1);
// console.log(lastIndex);
//         console.log(afterQuestionMark);
        setCompanyContractAddress(beforeQuestionMark);
        setProductId(afterQuestionMark);
        
        // checkProduct()
          setData(str);}
          else {
            setCompanyContractAddress('0xac16DF8e44D32090143927a2b4D594b9887f4A86');
            setProductId('1999821');
            setData("wrong");
          }
        } else {
          setData('No QR code found');
        }
      };
    };

    reader.readAsDataURL(file);
  }
};

    

    return (
        <div className='VerifyProduct'>
            <h3 className='Component__title'>Verify Product</h3>
            <div className='Component__form'>
                {/* <div className='form__content'>
                    <label className='form__label'>Enter Company contract address</label>
                    <input type="text" className='form__input' value={companyContractAddress} onChange={handleInput1Change} />
                </div> */}
                {/* <div className='form__content'>
                    <label className='form__label'>Enter Product id</label>
                    <input type="text"  className='form__input' value={productId} onChange={handleInput2Change} />
                </div> */}
                
          
                <div className='form__content'>
                    <h2 className='text-center mb-4'> Scan Your QR Code</h2>
                    <div className='card border-0'>
                        <div className="card-body">
                            <button type='button' onClick={handleClick} className='btn btn-success'>
                                Scan QRCode
                            </button>
                            <input type="file"
                                ref = {fileRef}
                                onChange={handleChange}
                                accept=".png, .jpg, .jpeg" 
                                className='d-none' />
                            <div className='mt-4'>
                                {file && <img src={URL.createObjectURL(file)} alt="QR Code" />}
                                {/* {data && <p className="small mt-5">data: {data}</p>} */}
                            </div>
                        </div>
                    </div>
                    {/* {scannedData ? <p>Scanned data: {scannedData}</p> : <QRScanner onScan={handleScan} />} */}
                </div>

                <button className='button__toggle form__button' onClick={checkProduct}>Verify</button>
                {productStatus && <p>Result: {productStatus}</p>}
            </div>
        </div>
    )
}

// class QrContainer extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             result: 'Hold QR Code Steady and Clear to scan',
//         }
//         this.handleScan = this.handleScan.bind(this)
//     }
//     handleScan(result){
//         this.setState({
//             result: "data"
//         })
//     }
//     handleError(err){
//         console.error(err)
//     }
//     render(){
//         const previewStyle = {
//             height: 200,
//             width: 200,
//             display: 'flex',
//             "justify-content": "center"
//         }
//         const camStyle = {
//             display: 'flex',
//             justifyContent: "center",
//             marginTop: '-50px'
//         }

//         const textStyle = {
//             fontSize: '30px',
//             "text-align": 'center',
//             marginTop: '-50px'
//         }

//         return(
//             <React.Fragment>
//                 <div style={camStyle}>
//                     <QrReader
//                         delay={100}
//                         style={previewStyle}
//                         onError={this.handleError}
//                         onScan={this.handleScan}
//                         />
//                 </div>
//                 <p style={textStyle}>
//                     {this.state.result}
//                 </p>
//             </React.Fragment>
//         )
//     }
// }

export default VerifyProduct;
