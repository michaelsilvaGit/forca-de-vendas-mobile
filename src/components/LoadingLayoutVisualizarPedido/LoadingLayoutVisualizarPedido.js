import React from 'react'
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './Styles'









const LoadingLayoutVisualizarPedido = () => {


    return (

        <>

            <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={60}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={100}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={35}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={250}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={55}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={280}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={60}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={120}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={120}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={100}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={90}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={160}
                            height={18}
                        />
                    </View>
                </View>

                <View style={Styles.containerInfo}>
                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={75}
                            height={10}
                        />
                    </View>

                    <View style={Styles.containerFalseInputs}>

                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={240}
                            height={28}
                        />
                    </View>
                </View>
            </View>



            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={Styles.containerInfoItens}>

                    <View style={{ alignSelf: 'center', marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={90}
                            height={20}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={270}
                            height={25}
                        />
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={45}
                            height={13}
                        />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View>
                            <View style={{ marginTop: 15 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>
                        </View>


                        <View>
                            <View style={{ marginTop: 15 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    width={120}
                                    height={13}
                                />
                            </View>
                        </View>


                    </View>

                </View>

            </View>

            {/* <View style={{ width: '95%', marginTop: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={80}
                    height={18}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={100}
                    height={16}
                />
            </View>

            <View style={Styles.containerButtons}>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={300}
                    height={30}
                />
            </View> */}

        </>





    )
}


export default LoadingLayoutVisualizarPedido