import React from 'react'
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './Styles'





const LoadingLayoutPedido = () => {


    return (
        
        <View style={Styles.containerPedido}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={40}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={80}
                />
            </View>
            <View>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={350}
                    height={20}                    
                />
                <View style={{ marginTop: 5 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={80}
                        height={15}                    
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={85}
                        height={25}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={200}
                        height={25}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={200}
                        height={25}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={55}
                            height={30}
                        />
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={75}
                            height={30}
                        />
                    </View>
                </View>

            </View>
        </View>

    )

}




export default LoadingLayoutPedido