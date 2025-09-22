import React, { useEffect } from 'react';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, ScrollView } from 'react-native';
import numberFormatBRL from '../../utils/numberFormatBRL';
import { useSelector } from 'react-redux';
import { globalStyles } from '../../globalStyles';

const screenWidth = Dimensions.get('window').width;


const Grafico = () => {

  const nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const {totalVendasMes} = useSelector((state) => state.pedido);
  const {meta} = useSelector((state) => state.configuracao);

  const [selectedPoint, setSelectedPoint] = useState({ x: null, y: null, value: null });
  const [meses, setMeses] = useState(["Jan"]);
  const [valoresMeses, setValoresMeses] = useState([]);



  useEffect(() => {
    if(totalVendasMes){
      setMeses(obterNomeMeses(totalVendasMes));
      setValoresMeses(totalVendasMes);
    }
  }, [totalVendasMes])



  const data = {
    labels: meses,
    datasets: [
      {
        data: valoresMeses.length > 0 ? valoresMeses : [0],
        color: (opacity = 1) => `#0066cc`, // Cor da linha de vendas
        strokeWidth: 2,
      },
      {
        data: Array(meses.length > 0 ? meses.length : 0).fill(meta), // Cria um array com a meta repetida para cada mês
        color: (opacity = 1) => `#008078`, // Cor da linha da meta
        strokeWidth: 1,
        withDots: false, // Não exibe os pontos na linha da meta
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#e0f7fa',
    backgroundGradientTo: '#80deea',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
    labelColor: () => `#004d80`,
    propsForDots: {
      r: '6',
      strokeWidth: '1.5',
      stroke: '#004d80',
      fill: '#e0f7fa',
    },
  };


  const handleDataPointClick = (data) => {
    setSelectedPoint({
      x: data.x,
      y: data.y,
      value: data.value,
    });
  };


  function obterNomeMeses(valorMeses) {
    return nomeMeses.slice(0, valorMeses.length);
  }


  return (
    <View>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
        <Text style={[globalStyles.text, { fontSize: 18 }]}>Progresso de Vendas</Text>
      </View>

      <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, marginBottom: 3 }}>
        <View style={{ height: 'auto' }}>
          <LineChart
            yAxisLabel='R$'
            segments={6}
            yAxisInterval={10}
            withScrollableDot={false}
            data={data}
            width={(data.labels.length * 50) + screenWidth}
            height={300}
            chartConfig={chartConfig}
            onDataPointClick={handleDataPointClick}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {selectedPoint.value !== null && (
          <View
            style={{
              position: 'absolute',
              left: selectedPoint.x + 8,
              top: selectedPoint.y - 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 4,
              borderRadius: 4
            }}
          >
            <Text style={[globalStyles.text, { fontSize: 11, fontWeight: '900' }]}>
              {numberFormatBRL(selectedPoint.value)}
            </Text>
          </View>
          
        )}
        <View style={{position: 'absolute', bottom: 13, left: 53}}>
            <Text style={[globalStyles.text, {color: '#008078'}]}>{`Meta: ${numberFormatBRL(meta)}`}</Text>
          </View>
      </ScrollView>
    </View>
  );
};


export default Grafico;