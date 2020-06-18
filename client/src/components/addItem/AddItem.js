import React, {Fragment, useContext, useEffect, useState} from "react";
import ItemsContext from "../../context/items/itemsContext";
import Loader from "../layouts/Loader";

const AddItem = () => {
    const itemsContext = useContext(ItemsContext);
    const { getCategories, addItem, categories, loading } = itemsContext;

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, []);

    const [item, setItem] = useState({
        name: '',
        description: '',
        price: ''
    });

    const [category, setCategory] = useState({
       ru: '',
       eng: ''
    });

    const [image, setImage] = useState({
        img: ''
    });


    const onChange = event => {
        setItem({ ...item, [event.target.name]: event.target.value });
    };

    const onChangeCategory = event => {
        setCategory({
            ru: event.target.value.split('/')[0],
            eng: event.target.value.split('/')[1]
        });
    };

    const onChangeImg = event => {
        setImage({
            img: event.target.files[0]
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', item.name);
        formData.append('description', item.description);
        formData.append('price', item.price);
        formData.append('category', category.ru);
        formData.append('category_eng', category.eng);
        formData.append('file', image.img);
        addItem(formData);
        setItem({
            name: '',
            description: '',
            price: ''
        });
        setCategory({
            ru: '',
            eng: ''
        });
        setImage({
            img: ''
        });
    };

    if (categories !== null && categories.length === 0 && !loading) {
        return <h4 className="text-center">Без категорий товар не добавить(:</h4>
    }

    return (
        <Fragment>
            {categories !== null && !loading
                ? (
                    <form onSubmit={onSubmit} className="text-center border border-light ищк p-3 mt-3 mb-3">
                        <label className="text-left">Название товара</label>
                        <input type="text"
                               className="form-control mb-1"
                               name="name"
                               value={item.name}
                               onChange={onChange}
                               placeholder="Введите название товара"/>
                        <label className="text-left">Описание товара</label>
                        <textarea className="form-control mb-1"
                                  style={{height: 200, maxHeight: 200, minHeight: 200}}
                                  name="description"
                                  value={item.description}
                                  onChange={onChange}
                                  placeholder="Описание товара"/>
                        <label className="text-left">Цена товара</label>
                        <input type="number"
                               className="form-control mb-1"
                               name="price"
                               value={item.price}
                               onChange={onChange}
                               placeholder="Введите цену"/>
                        <label className="text-left">Выбор категории</label>
                        <select onChange={onChangeCategory} className="custom-select mb-1">
                            {categories.map(category => (<option key={category._id} value={category.name}>{category.name.split('/')[0]}</option>))}
                        </select>
                        <label className="text-left">Выберите изображение для загрузки</label>
                        <input type="file" onChange={onChangeImg} className="form-control-file mb-2"/>
                        <button type="submit" className="btn btn-dark btn-block">Добавить товар</button>
                    </form>
                    )
                : <Loader/>
            }
        </Fragment>
    )
};

export default AddItem;