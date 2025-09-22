import React from 'react'
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './Styles'






const LoadingLayoutCliente = () => {



    return (

        <View style={Styles.containerCliente}>
            <View style={Styles.containerInfo}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={300}
                            height={40}
                        />
                    </View>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={140}
                            height={15}
                        />
                    </View>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={150}
                            height={15}
                        />
                    </View>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={100}
                            height={15}
                        />
                    </View>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={90}
                            height={15}
                        />
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={60}
                            height={15}
                        />
                    </View>
                    <View style={{ marginBottom: 6 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={350}
                            height={22}
                        />
                    </View>
                </View>

                <View style={{position: 'absolute', right: 25, top: 70}}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={25}
                        height={25}
                    />
                </View>


            </View>

        </View>

    )

}


export default LoadingLayoutCliente