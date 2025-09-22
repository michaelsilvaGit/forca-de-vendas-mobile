import React from 'react'
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './Styles'





const LoadingLayoutProdutoPedido = () => {

    return (

        <View style={Styles.containerPrincipal}>

            <View style={Styles.containerHeader}>
                
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={70}
                    height={70}
                />                    

                <View style={{ flex: 1, marginLeft: 7 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={250}
                        height={30}
                    />
                </View>

            </View>

             <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 70 }}>
                <View style={{ width: '100%', paddingLeft: 8, marginTop: 10}}>
                    <View style={{marginBottom: 5}}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={100}
                            height={18}
                        />  
                    </View>                                     
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={130}
                        height={18}
                    />

                </View>
            </View>


            <View style={Styles.ContainerMeio}>
                <View style={Styles.containerQtd}>
                 
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={100}
                        height={45}
                    />                      
          
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={110}
                        height={40}
                    /> 

                </View>

                <View style={Styles.containerValorEquivalente}>
                    <View>

                        <View style={{ marginBottom: 5 }}>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                width={70}
                                height={15}
                            />
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                width={70}
                                height={15}
                            />
                        </View>

                    </View>

                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={120}
                        height={30}
                    />

                </View>

                <View style={Styles.containerDesconto}>
                    <View style={{ }}>
                        
                        <View style={{ marginBottom: 5 }}>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                width={100}
                                height={21}
                            />
                        </View>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={160}
                            height={28}
                        />
                        
                    </View>

                    <View style={{  }}>
                        <View style={{ marginBottom: 5 }}>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                width={100}
                                height={21}
                            />
                        </View>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={160}
                            height={28}
                        />
                    </View>
                </View>
            </View>

           
            <View style={Styles.containerFooter}>
                <View>
                    <View style={{ marginBottom: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={70}
                            height={20}
                        />
                    </View>

                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={110}
                        height={27}
                    />
                </View>

                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={110}
                    height={40}
                />
                
            </View>
        </View>
    )

}

export default LoadingLayoutProdutoPedido