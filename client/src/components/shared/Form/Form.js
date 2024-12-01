import React,{useState} from 'react'
import InputType from './InputType';
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/authService';

const Form = ({formType,submitBtn,formTitle}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("donor");
    const [name,setName] = useState("");
    const [organisationName,setOrganisationName] = useState("");
    const [hospitalName,setHospitalName] = useState("");
    const [website,setWebsite] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
  return (
    <>
      <form onSubmit={(e)=>{
        if(formType === 'Login')return handleLogin(e,email,password,role);
        else if(formType === 'Register')return handleRegister(e,email,password,role,name,organisationName,hospitalName,website,address,phone);
      }}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-1">
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="donorRadio"
              value={'donor'}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="donorRadio">
              Donor
            </label>
          </div>
          <div className="form-check ms-2">
          <input
              className="form-check-input"
              type="radio"
              name="role"
              id="adminRadio"
              value={'admin'}
              onChange={(e) => setRole(e.target.value)}
            //   defaultChecked
            />
            <label className="form-check-label" htmlFor="adminRadio">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
          <input
              className="form-check-input"
              type="radio"
              name="role"
              id="organisationRadio"
              value={'organisation'}
              onChange={(e) => setRole(e.target.value)}
            //   defaultChecked
            />
            <label className="form-check-label" htmlFor="organisationRadio">
              Organisation
            </label>
          </div>
          <div className="form-check ms-2">
          <input
              className="form-check-input"
              type="radio"
              name="role"
              id="hospitalRadio"
              value={'hospital'}
              onChange={(e) => setRole(e.target.value)}
            //   defaultChecked
            />
            <label className="form-check-label" htmlFor="hospitalRadio">
              Hospital
            </label>
          </div>
        </div>
        {/* switch Statements */}
        {(() => {
          switch (true) {
            case formType === "Login": {
              return (
                <>
                  <InputType
                    labelText={"Email Address"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "Register": {
              return (
                <>
                  <InputType
                    labelText={"Email Address"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <InputType
                            labelText={"Role"}
                            labelFor={"forRole"}
                            inputType={"text"}
                            name={"role"}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            /> */}
                {(role==='admin'||role==='donor')&& (
                  <InputType
                    labelText={"Name"}
                    labelFor={"forName"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                {role==='organisation' && (
                  <InputType
                    labelText={"Organisation Name"}
                    labelFor={"forOrganisationName"}
                    inputType={"text"}
                    name={"organisationName"}
                    value={organisationName}
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                )}   
                {role==='hospital' &&(
                  <InputType
                    labelText={"Hospital Name"}
                    labelFor={"forHospitalName"}
                    inputType={"text"}
                    name={"hospitalName"}
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                )}
                  <InputType
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}
        


        <div className="d-flex flex-row justify-content-between">
            {formType==='Login'?(
                <p>New User ? Register  
                    <Link to='/register'>  Here!</Link>
                </p>
            ):(
                <p>Already a user?
                    <Link to='/login'>  Login</Link>
                </p>
            )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form
