import React, { useEffect, useState } from 'react'
import {getUsers, patchUser, removeUser, addUser, users} from '../allfunction/index'
import './style.css'

function Form() {


     const [data, setdata] = useState({
        id:0, 
        name: '', 
        gender: '', 
        city: '', 
        state : '', 
        address : '', 
        html : '', 
        css : '', 
        js : '', 
        isUpdate : false
    })

     useEffect(getUsers, []);
    
    const submitHandler = e => {
        e.preventDefault()
        const data = {
            name: e.target.name.value, 
            gender: document.getElementById('male').checked ? 'Male' : 'Female', 
            city : e.target.city.value,
            state : e.target.state.value,
            address : e.target.address.value,
            html : document.getElementById('html').checked,
            js : document.getElementById('js').checked, 
            css : document.getElementById('css').checked
         }
         if (`${document.getElementById('isUpdate').value}` === 'true') {
            const id = document.getElementById('id').value
            patchUser(id, data)
         }else {
            addUser(data);
         } 
        setdata(data);
        reset()
    }

    const reset = () => {
        const e = document.user
        e.reset()
        document.getElementById('isUpdate').value = false
        document.getElementById('id').value = 0
        e.name.value = '';
        e.city.value = '';
        e.address.innerHTML = '';
    }

    const updateValue = e => {
        document.getElementById('isUpdate').value = true
        document.getElementById('name').value = e.name
        document.getElementById('city').value = e.city
        document.getElementById('state').value = e.state
        document.getElementById('address').innerHTML = e.address
        document.getElementById('male').checked = e.gender == 'Male'
        document.getElementById('female').checked = e.gender == 'Female'
        document.getElementById('html').checked = e.html
        document.getElementById('css').checked = e.css
        document.getElementById('js').checked = e.js
        setdata(e);
        console.log(e);
    }
    
    return (
        <span>
            <center>
                <br/>
            <form className='form' action="" name="user" onSubmit={submitHandler} onReset={reset} >
                <input type="hidden" id="id" name="id" value={data.id}/>
                <input type="hidden" id="isUpdate" name="isUpdate" value={data.isUpdte}/>
                <table>
                <tr>
                    <td>
                    Name : 
                    </td>
                    <td>
                    <input type="text" required={true} name="name" id="name" defaultValue={data.name} placeholder='Enter Name...' />
                    </td>
                </tr>
                <tr>
                <td>
                Gender : 
                </td>
                <td>
                <span>
                <input type="radio"  name="gender" id="male" defaultValue={data.gender == 'male' ? 'checked' : ''}/>
                Male
                </span>
                <span>
                <input type="radio"  name="gender" id="female" defaultValue={data.gender == 'female' ? 'checked' : ''}/>
                Female
                </span>
                </td>
                </tr>
                <tr>
                <td>
                City : 
                </td>
                <td>
                <input type="text" required={true} name="city" id="city" defaultValue={data.city} placeholder='Enter City' />
                </td>
                </tr>
                <tr>
                <td>
                State : 
                </td>
                <td>
                <select required={true} name="state" id="state" defaultValue={data.state}>
                    <option value="tamilnadu">Tamil Nadu</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="Andra">Andra</option>          
                </select>
                </td>
                </tr>
                <tr>
                <td>

                Address :
                </td>
                <td>

                <textarea required={true} name="address" id="address" cols="30" rows="10" placeholder='Enter Address' >{data.address}</textarea>
                </td>
                </tr>
                <tr>
                <td>

                Skills : 
                </td>
                <td>

                <span>
                    HTML
                <input type="checkbox" id='html' defaultValue={data.html ? 'checked' : ''}/>
                </span>
                
                <span>
                    CSS
                <input type="checkbox" id="css" defaultValue={data.html ? 'checked' : ''} />
                </span>
                <span>
                    JS
                <input type="checkbox" id="js" defaultValue={data.html ? 'checked' : ''} />
                </span>
                </td>
                </tr>
                <tr>

                <button type="submit" value="submit" className="button" >submit</button>
                <button type="reset" className="button" >Reset</button>

                </tr>
                </table>
            </form><br/>
            <table border=".2px" className="table" id="show">
                <thead className="tableHeader" >
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Address</th>
                        <th>skills</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                {
                users.map((ev) =>
                {
                    return (

                        <tr>
                        <td>
                            #{ev.id} {ev.name}
                        </td>
                        <td>
                            {ev.gender}
                        </td>
                        <td>
                            {ev.city}
                        </td>
                        <td>
                            {ev.state}
                        </td>
                        <td>
                            {ev.address}
                        </td>
                        <td>
                            {ev.js ? 'js' : ''}&nbsp;
                            {ev.html ? 'html' : ''}&nbsp;
                            {ev.css ? 'css' : ''}
                        </td>
                        <td>
                            <button onClick={e => updateValue(ev)} className="warning" >edit</button>
                            <button onClick={e => {removeUser(ev.id); e.target.closest('tr').remove() }} className="danger" >delete</button>
                        </td>
                    </tr>
                        )
                    }
                )
                }
                </tbody>
            </table>
            </center>
        </span>
    )
}

export default Form
