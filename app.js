import React, { useState, useEffect } from 'react';
import {
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

const App = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [productsInCart, setProductsInCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].stepper = 0;
      }
      setProducts(data);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ padding: 16, flexDirection: 'row', flex: 1 }}>
          <Image
            style={{ height: 50, flex: 0.2, width: 50, alignContent: 'center' }}
            source={{ uri: item.image }}
          />
          <View style={{
              flex: 0.6,
              alignSelf: 'top',
              flexDirection:'column',
            }}>
            <Text
            style={{
              fontSize: 10,
              marginStart: 10,
              alignSelf: 'top',
            }}>
            {item.title}
          </Text>
          <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flexDirection: 'column',
                padding: 10
              }}>
              <Text style={{ color: 'grey', fontSize: 8 }}>UOM</Text>
            <Text style={{ color: 'grey', fontSize: 8, color: 'black', fontWeight: 'bold'}}>02</Text>
            </View>  

            <View style={{
                flexDirection: 'column',
                padding: 10
              }}>
              <Text style={{ color: 'grey', fontSize: 8 }}>PACK SIZE</Text>
            <Text style={{ color: 'grey', fontSize: 8, color: 'black', fontWeight: 'bold'}}>02</Text>
            </View> 

            <View style={{
                flexDirection: 'column',
                padding: 10
              }}>
              <Text style={{ color: 'grey', fontSize: 8 }}>PER UNIT</Text>
            <Text style={{ color: 'grey', fontSize: 8, color: 'black', fontWeight: 'bold'}}>$45</Text>
            </View> 

            <View style={{
                flexDirection: 'column',
                padding: 10
              }}>
              <Text style={{ color: 'grey', fontSize: 8 }}>TOTAL</Text>
            <Text style={{ color: 'grey', fontSize: 8, color: 'black', fontWeight: 'bold'}}>$24</Text>
            </View>     
            
            </View>
          </View>



                  <View style={{ flexDirection: 'row', flex: 0.2 }}>
        {item.stepper==0 ? (
          <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:50,
                        height:20,
                        borderEndEndRadius:20,
                        borderStartEndRadius:20,
                        borderEndStartRadius:20,
                        borderStartStartRadius:20,
                        backgroundColor:'green',
                      }}
                  >
                   <Text onPress={() => itemAddInCart(item)} style={{ fontSize: 10 ,color : 'white', alignSelf:'stretch',textAlign:'center' }}>ADD</Text>
                          
                  </TouchableOpacity>
        ) : ( <View style={{ flexDirection: 'row', flex: 0.2 }}>
                            <TouchableOpacity
                      onPress={() => itemDecrement(item)}
                      style={{
                        height: 20,
                        backgroundColor: 'green',
                        width: 20,
                        alignItems: 'center',
                        borderEndStartRadius: 20,
                        borderStartStartRadius: 20,
                      }}>
                      <Text style={{ color: 'white' }}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        width: 20,
                        height: 20,
                        textAlign: 'center',
                      }}
                      value={`${item.stepper}`}
                      onChangeText={() => {}}
                    />
                    <TouchableOpacity
                      onPress={() => itemIncrement(item)}
                      style={{
                        height: 20,
                        backgroundColor: 'green',
                        width: 20,
                        alignItems: 'center',
                        borderEndEndRadius: 20,
                        borderStartEndRadius: 20,
                      }}>
                      <Text style={{ color: 'white' }}>+</Text>
                    </TouchableOpacity>
        </View>)}
                    
                  </View>
        </View>
        <View style={{ backgroundColor: '#F3EEEA', height: 0.5 }}></View>
      </View>
    );
  };


  itemIncrement = (item) => {
    item.stepper = item.stepper + 1;
    let product = productsInCart.find(o => o.id === item.id);
    if (product === undefined) {
      productsInCart.push(item);
    }
    updateCartAmount();
    getAddedProductCount();
  };

  itemDecrement = (item) => {
    if (productsInCart.length > 0 ) {
      
       let product = productsInCart.find(o => o.id === item.id);
        if (product) {
             if (item.stepper > 0) {
                item.stepper = item.stepper - 1;
                if(item.stepper===0){
                productsInCart.pop(item);
                console.log('click on here test', productsInCart);
                }
              } else{
                productsInCart.pop(item);
              }
        } else{
         productsInCart.pop(item); 
        }
         
      updateCartAmount();
      getAddedProductCount();
    } else {
      item.stepper = 0;
      productsInCart.pop(item); 
      updateCartAmount();
      getAddedProductCount();
    }
  };

  itemAddInCart = (item) => {
    item.stepper = item.stepper + 1;
    let product = productsInCart.find(o => o.id === item.id);
    if (product === undefined) {
      productsInCart.push(item);
    }
    updateCartAmount();
    getAddedProductCount();
  };

  function updateCartAmount() {
    var totalAmountTemp = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      totalAmountTemp = totalAmountTemp + productsInCart[i].price * productsInCart[i].stepper;
    }
    setTotalAmount(totalAmountTemp.toFixed(2));
  }

   function getAddedProductCount() {
    setCount(productsInCart.length);
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column' }}>
                    <SafeAreaView
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        backgroundColor: 'green',
                      }}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          margin: 10,
                          alignContent: 'center',
                        }}
                        source={{
                          uri: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          flex: 1.2,
                          alignSelf: 'center',
                        }}>
                        App Name
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          flex: 1,
                          marginStart: 10,
                        }}>
                        <Image
                          style={{ height: 20, width: 20, alignSelf: 'center' }}
                          source={{
                            uri: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            alignSelf: 'center',
                            marginStart: 10,
                          }}>
                          Filter
                        </Text>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            alignSelf: 'center',
                            marginStart: 20,
                          }}
                          source={{
                            uri: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
                          }}
                        />
                      </View>
                    </SafeAreaView>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>

      <View style={{ flex: 0 }}>
        <View
          style={{
            height: 50,
            backgroundColor: '#E3651D',
            flexDirection: 'row',
          }}>

          <View style={{
              flex: 0.3,
              color: 'white',
              backgroundColor:'#EC8F5E',
              justifyContent: 'center'
            }}
          ><Text
            style={{
              fontSize: 15,
              color: 'white',
              fontWeight: 'bold',
              textAlign:'center',
            }}>
            ${totalAmount}
          </Text></View>
        
          <View
            style={{
              alignSelf: 'center',
              flex: 0.7,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                alignSelf: 'center',
                marginStart: 10,
                fontWeight: 'bold',
              }}>
              VIEW CART({count})
            </Text>
            <Image
              style={{
                height: 20,
                width: 20,
                margin: 10,
                alignContent: 'center',
              }}
              source={{
                uri: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
