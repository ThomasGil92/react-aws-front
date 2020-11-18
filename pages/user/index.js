import Layout from '../../components/Layout'
import axios from 'axios'
import { getCookie } from '../../helpers/auth'
import withUser from '../withUser'

const User = ({ user, token }) => {
    return (
        <Layout>
            <div className="col-6">
                {JSON.stringify(user)}
                {JSON.stringify(token)}
            </div>
        </Layout>
    )
}





export default withUser(User)