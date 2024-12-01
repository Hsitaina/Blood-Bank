import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import {useSelector} from 'react-redux';

const AdminHome = () => {
    const {user} = useSelector((state)=>state.auth);
  return (
    <Layout>
        <div className="container">
            <div className="d-flex flex-column mt-4">
                <h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
                <h3>Manage Blood App</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates nemo nobis consequuntur consequatur. Fugit molestias sit eveniet nesciunt, repellendus ducimus mollitia sed dolorem nostrum at nobis laboriosam non veniam explicabo perferendis magni! Itaque, tempora dignissimos? Deleniti, magni mollitia. Commodi perspiciatis iure pariatur facere quis eveniet molestiae magni possimus, ut ad consectetur praesentium officia architecto consequatur. Nostrum perferendis facilis officia enim cum! Facilis est vel omnis tenetur, nemo ipsam error! Dolore quo facere rerum facilis ipsam provident sapiente nisi? Et quasi sed, rem id necessitatibus deleniti assumenda. Totam quisquam est rem, sapiente assumenda quibusdam ipsam necessitatibus maiores nesciunt tenetur corporis!</p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminHome
