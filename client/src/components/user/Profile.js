import React, {Fragment, useContext, useEffect, useState} from "react";
import "../../sass/Profile.scss";
import AuthContext from "../../context/auth/authContext";
import Loader from "../layouts/Loader";
import {flb} from "../../utils/someFunctions";

const Profile = () => {
    const authContext = useContext(AuthContext);
    const { user, loading, getAvatar, isAuthenticated, changeAvatar, avatar } = authContext;

    useEffect(() => {
        if (isAuthenticated) getAvatar();
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const [image, setImage] = useState({
        imgName: ''
    });

    const onChange = event => {
        setImage({
            imgName: event.target.files[0]
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', image.imgName);
        changeAvatar(formData);
        setImage({
            imgName: ''
        })
    }

    return (
        <Fragment>
            {user !== null && !loading
                ?
                <div className="row mb-5" style={{marginTop:"10%"}}>
                    <div className="col-md-6 img">
                        <img style={{width: "90%", maxHeight: "800px", borderRadius: "7px", border: "2px solid black"}}
                            src={avatar !== null && !loading ? avatar : "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"}
                            alt={user.name} className="img-rounded"/>
                    </div>
                    <div className="col-md-6 details">
                        <blockquote>
                            <h3 className="text-center">{flb(user.role)}</h3><br/>
                            <h4>{flb(user.name)} {flb(user.surname)}</h4><p/>
                            <h5>Страна: {flb(user.country)}<i
                                className="icon-map-marker"/></h5><p/>
                            <h5>Город: {flb(user.city)}<i
                                className="icon-map-marker"/></h5><p/>
                            <h5>Адрес: {user.address}<i
                                className="icon-map-marker"/></h5><p/>
                        </blockquote>
                        <h6>
                            Ваш электронный адрес: {user.email}
                        </h6>
                        <div className="mt-5 mb-5" style={{marginLeft: "5%"}}>
                            <form onSubmit={onSubmit}>
                                <input onChange={onChange} type="file" className=""/>
                                <button type="submit" className="btn btn-dark btn-block mt-1">Загрузить</button>
                            </form>
                        </div>
                    </div>
                </div>
                : <Loader/>
            }
        </Fragment>
    )
};

export default Profile;