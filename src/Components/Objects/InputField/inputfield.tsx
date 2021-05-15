import React, { useCallback, useEffect, useState } from 'react'
import * as maskProps from '../../../Helpers/mask'
import {StringisNullOrEmpity} from '../../../Helpers/helpers'
import '../InputField/inputfield.css'



const InputField: React.FC<maskProps.InputProps> = ({ Required = false, RequiredText, name, mask, ...props }) => {

    const [prefix, setPrefix] = useState("");
    const [enableRequiredText, setEnable] = useState(false);

    useEffect(() => {
        switch (mask) {
            case 'REALCURRENCY':
                setPrefix("R$")
                break;
            case 'DOLARCURRENCY':
                setPrefix("U$")
                break;
            case 'EUROCURRENCY':
                setPrefix("€")
                break;
        }
    }, [])

    const handleKeyup = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        switch (mask) {
            case 'CEP':
                return maskProps.cep(e);
            case 'REALCURRENCY':
                return maskProps.currency(e)
            case 'DOLARCURRENCY':
                return maskProps.currency(e)
            case 'EUROCURRENCY':
                return maskProps.currency(e)
            case 'CELLPHONE':
                return maskProps.cellphone(e)
            case 'CPF':
                return maskProps.CPF(e)
            case 'CNPJ':
                return maskProps.CNPJ(e)
            case 'NUMBER':
                return maskProps.number(e)
            case 'TEXT':
                return maskProps.text(e)
            case 'DATA':
                return maskProps.data(e)
        }
    }, [])

    const checkRequired = (e: React.FormEvent<HTMLInputElement>) => {
        if(Required && StringisNullOrEmpity( e.currentTarget.value)){
            setEnable(true)
        }       
    };

    const removeRequiredText= () => {
        setEnable(false)
     }

    return (
        <div className="div1">
            {prefix && <span className="prefix-span">{prefix}</span>}
            <div className="div2">

                <input
                    {...props}  
                    placeholder=" "
                    className="input1"                     
                    onChange={handleKeyup}  
                    onBlur={checkRequired} 
                    onClick={removeRequiredText}
                    required={!enableRequiredText}/>
                <label className="label1">
                    {name}
                    <span className="span1" hidden={!Required}> *</span>
                </label>
                <fieldset className="fieldset1">
                    <legend className="legend1" />                    
                </fieldset>
            </div>
            <div>
                <span className="span2" hidden={!enableRequiredText}>{RequiredText}</span>
            </div>
        </div>
    )
}
export default InputField

