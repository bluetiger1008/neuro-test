import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Button, CheckBox } from 'react-native-elements';

import dummyData from './tableData';

type ItemProps = {
  clientId: string;
  injury: string;
  sideLevel: string;
  strength: string;
  createdAt: string;
};

function ClientDirectory() {
  const [tableHead, setTableHead] = useState([
    '',
    'Client Id',
    'Injury',
    'Injury side or SCI level',
    'Strength',
    'Created At'
  ]);
  const [tableData, setTableData] = useState([]);

  React.useEffect(() => {
    let arr = [];

    dummyData.map((item: ItemProps) => {
      arr = [...arr, [false, ...Object.values(item)]];
    });
    setTableData(arr);
  }, []);

  const onClickCheckbox = (index: number) => {
    const arr = tableData;
    arr[index][0] = !arr[index][0];
    setTableData([...arr]);
  };

  const element = (data: boolean, index: number) => {
    return (
      <View>
        <CheckBox checked={data} onPress={() => onClickCheckbox(index)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Button title="New Client" />
        </View>
        <View style={styles.cardContent}>
          <Table>
            <Row
              data={tableHead}
              flexArr={[1, 1, 1, 2, 1, 2]}
              style={styles.head}
              textStyle={styles.text}
            />
            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex: number) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 0 ? element(cellData, index) : cellData}
                    style={{
                      flex: cellIndex === 3 || cellIndex === 5 ? 2 : 1,
                      borderBottomWidth: 1,
                      borderColor: '#C1C0B9'
                    }}
                    borderStyle={{}}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingLeft: 50,
    paddingRight: 50
  },
  cardContainer: {
    marginTop: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff'
  },
  cardHeader: {
    alignSelf: 'flex-start',
    padding: 20
  },
  cardContent: {},
  head: { height: 40, borderBottomWidth: 1, borderColor: '#C1C0B9' },
  text: { margin: 6 },
  row: { flexDirection: 'row' }
});

export default ClientDirectory;