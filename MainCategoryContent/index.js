/**
 * Created by watcher on 6/15/16.
 */

import React from 'react'
import $ from 'jquery'
import ContentContainer from '../../components/ContentContainer'
import PodCategoryItem from '../../components/PodCategoryItem'
import Zajavka from '../../components/Zajavka'
import './styles.scss'


function htmlEntities(data) {
    return {__html: data}
}

class MainCategoryContent extends React.Component {
    constructor (...args) {
        super(...args)
        this.state = {category: '', products: [], product: {}}
    }
    componentWillMount () {
        let cutHref = document.location.pathname.split('/')[3] || 0,
            targetProduct
        $.post('/get_data.php', {get_products_from: this.props.params.category}, response => {
            let products = response.slice(1)
            targetProduct = products.filter(item => {
                if(item.product_href == cutHref) {
                    return item                    
                }
            })[0] || products[0]
            this.setState({category: response[0]['category_name'], products, product: targetProduct})
        }, 'json')                
    }
    componentWillReceiveProps(nextProps) {
        let products = this.state.products
        let targetProduct = products.filter(item => {
            if(item.product_href == nextProps.params.product) {
                return item   
            }            
        })
        this.setState({product: targetProduct[0]})
        this.forceUpdate()
    }
    render () {
        return (
            <ContentContainer>
                <div className='col-xs-3' style={{float: 'none', display: 'inline-block', verticalAlign: 'top'}}>
                    <span className='text-xs-center'><h4>{this.state.category}</h4></span>
                    {
                        this.state.products.map(product => {
                            return (
                                <PodCategoryItem
                                    key={Math.random() * 343}
                                    category={product.category}
                                    product={product.product_href}
                                    name={product.product_name}
                                    pic={product.product_pic}
                                />
                            )
                        })
                    }
                </div>
                <div className='col-xs-8 m-l-1 text-xs-center product-content'>
                    <h2>{this.state.product.product_name}</h2>
                    <div className='text-justify' dangerouslySetInnerHTML={htmlEntities(this.state.product.product_text)} />
                    <input type='button' className='btn btn-success m-b-1' value='Заказать расчет заказа' data-toggle='modal' data-target='#modal_window'/>
                    <div className='modal fade' id='modal_window' tabIndex='-1' role='dialog' aria-hidden='true'>
                        <div className='modal-product-to-zakaz p-a-1'>
                            <div className='text-xs-center font-weight-bold m-b-1'>
                                {this.state.product.product_name}
                            </div>
                            <Zajavka product_to_buy={this.state.product.product_name} />
                        </div>
                    </div>                    
                </div>
            </ContentContainer>
        )
    }
}

export default MainCategoryContent
