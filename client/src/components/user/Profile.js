import React, {Fragment, useContext} from "react";
import "./Profile.css";
import AuthContext from "../../context/auth/authContext";
import Loader from "../layouts/Loader";

const Profile = () => {
    const authContext = useContext(AuthContext);

    const { user, loading } = authContext;

    return (
        <Fragment>
            {user !== null && !loading
                ?
                <div className="row" style={{marginTop:"10%"}}>
                    <div className="col-md-6 img">
                        <img style={{width:"90%"}}
                            src="https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                            alt="" className="img-rounded"/>
                    </div>
                    <div className="col-md-6 details">
                        <blockquote>
                            <h3>{user.role}</h3><br/>
                            <h4>{user.name} {user.surname}</h4><p/>
                            <h5>Страна: {user.country}<i
                                className="icon-map-marker"/></h5><p/>
                            <h5>Город: {user.city}<i
                                className="icon-map-marker"/></h5><p/>
                            <h5>Адрес: {user.address}<i
                                className="icon-map-marker"/></h5><p/>
                        </blockquote>
                        <h6>
                            Ваш электронный адрес: {user.email}
                        </h6>
                    </div>
                </div>
                : <Loader/>
            }
        </Fragment>
    )
};

export default Profile;