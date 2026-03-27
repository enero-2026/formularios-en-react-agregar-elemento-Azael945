import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { List, Text, TextInput, Button, Modal, Portal } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Agregar from "./agregar";

// Modal de editar definido aquí mismo, sin archivo separado
function ModalEditar({ visible, onDismiss, onEdit, alumno }) {
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre);
      setMatricula(alumno.matricula);
    }
  }, [alumno]);

  const limpiarCampos = () => {
    setNombre("");
    setMatricula("");
  };

  const handleEdit = () => {
    if (!nombre || !matricula) return;
    onEdit({ nombre: nombre.toUpperCase(), matricula });
    limpiarCampos();
    onDismiss();
  };

  const handleCancel = () => {
    limpiarCampos();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={{
          backgroundColor: "#1c1c1c",
          padding: 20,
          margin: 20,
          borderRadius: 10
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
          Editar Alumno
        </Text>

        <TextInput
          mode="outlined"
          label="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
          style={{ marginBottom: 10, backgroundColor: "#2c2c2c" }}
          textColor="white"
          theme={{ colors: { primary: "white", text: "white", placeholder: "gray" } }}
        />

        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={{ marginBottom: 20, backgroundColor: "#2c2c2c" }}
          textColor="white"
          theme={{ colors: { primary: "white", text: "white", placeholder: "gray" } }}
        />

        <Button mode="contained" onPress={handleEdit} buttonColor="purple" textColor="white">
          Guardar cambios
        </Button>

        <Button
          mode="contained"
          onPress={handleCancel}
          style={{ marginTop: 10 }}
          buttonColor="black"
          textColor="white"
        >
          Cancelar
        </Button>
      </Modal>
    </Portal>
  );
}

export default function alumnos() {

  const [alumnos, setAlumnos] = useState([]);
  const [buscaAlumno, setBuscaAlumno] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const onAdd = (alumno) => { setAlumnos([...alumnos, alumno]); };

  const handleBorrar = (matricula) => {
    setAlumnos(alumnos.filter((a) => a.matricula !== matricula));
  };

  const handleEditar = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setModalEditarVisible(true);
  };

  const onEdit = (alumnoEditado) => {
    setAlumnos(alumnos.map((a) =>
      a.matricula === alumnoSeleccionado.matricula ? alumnoEditado : a
    ));
    setAlumnoSeleccionado(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlumnos([
        { nombre: "CANDELARIA MORA SAMANTHA", matricula: "2114354" },
        { nombre: "CANTU SILVA JAVIER", matricula: "2111889" },
        { nombre: "CARMONA LOZANO ANGEL EMILIANO", matricula: "2069119" },
        { nombre: "CASTILLO ACOSTA JORGE", matricula: "2132842" },
        { nombre: "DAVILA GONZALEZ ALDO ADRIAN", matricula: "1994122" },
        { nombre: "DURAN BARRIENTOS FABRIZIO", matricula: "2018230" },
        { nombre: "FLORES GONZALEZ SEBASTIAN", matricula: "21045641" },
        { nombre: "DURAN BARRIENTOS FABRIZIO", matricula: "20182301" },
        { nombre: "FLORES GONZALEZ SEBASTIAN", matricula: "2104564" },
        { nombre: "FLORES LÓPEZ DIEGO", matricula: "2066033" },
        { nombre: "FLORES MARTINEZ ERICK ADRIAN", matricula: "2132976" },
        { nombre: "GARZA AVALOS DIEGO", matricula: "2066114" },
        { nombre: "GONZALEZ OVALLE CHRISTIAN GABRIEL", matricula: "2031243" },
        { nombre: "GRANJA PEÑA DIEGO", matricula: "20647331" },
        { nombre: "IBARRA RODRIGUEZ ALEXIS", matricula: "20312431" },
        { nombre: "MARTINEZ ELIAS ANGEL SEBASTIAN", matricula: "2064733" },
        { nombre: "MENDIETA GONZALEZ ESMERALDA GABRIELA", matricula: "2094647" },
        { nombre: "MIRELES VELAZQUEZ ALEJANDRO", matricula: "2005102" },
        { nombre: "MONSIVAIS SALAZAR ANDRES", matricula: "2064574" },
        { nombre: "PARRAZALEZ VALDESPINO MARTHA JULIETA", matricula: "2024783" },
        { nombre: "PEÑA MUNGARRO LUIS ANGEL", matricula: "2066077" },
        { nombre: "PUENTE REYNOSO JULIO CESAR", matricula: "2092151" },
        { nombre: "RAMIREZ LOPEZ BRYAN", matricula: "2103708" },
        { nombre: "RAMOS AVILA LILIANA VALERIA", matricula: "2115192" },
        { nombre: "RICO JAUREGUI MAURICIO", matricula: "2037503" },
        { nombre: "RIVERA LUNA ADRIAN", matricula: "2131513" },
        { nombre: "RIVERA REYNA JOSE EMILIO", matricula: "2013503" },
        { nombre: "RODRIGUEZ OLVERA ROSA ISELA", matricula: "2004613" },
        { nombre: "RODRIGUEZ RODRIGUEZ ANGEL AZAEL", matricula: "2133022" },
        { nombre: "SANCHEZ GALARZA JUAN CARLOS", matricula: "2026061" },
        { nombre: "SOLIS ORTIZ ALFREDO", matricula: "2095320" },
        { nombre: "VELAZQUEZ ABREGO HERWIN DANIEL", matricula: "2025350" },
        { nombre: "VILLAGRA RODRIGUEZ ANDRES NEHUEL", matricula: "2103895" },
        { nombre: "ZACATENCO OLIVE RODRIGO", matricula: "1857791" },
        { nombre: "ZAVALA CANTU TERESA MARGARITA", matricula: "2025218" }
      ]);
    }, 2000);
  }, []);

  if (!alumnos.length) {
    return <Text style={{ color: "black" }}>Cargando alumnos...</Text>;
  }

  const alumnosFiltrados = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(buscaAlumno.toLowerCase()) ||
    alumno.matricula.includes(buscaAlumno)
  );

  const alumnosOrdenados = [...alumnosFiltrados].sort((a, b) =>
    ordenAsc
      ? a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
      : b.nombre.localeCompare(a.nombre, "es", { sensitivity: "base" })
  );

  return (
    <>
      <TextInput
        mode="outlined"
        value={buscaAlumno}
        onChangeText={(text) => setBuscaAlumno(text)}
        style={{ margin: 10 }}
        placeholder="Buscar alumno o matrícula"
      />

      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        buttonColor="black"
        textColor="white"
        icon={() => <MaterialIcons name="person-add" size={20} color="white" />}
      >
        Agregar Alumno
      </Button>

      <Agregar
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onAdd={onAdd}
      />

      <ModalEditar
        visible={modalEditarVisible}
        onDismiss={() => setModalEditarVisible(false)}
        onEdit={onEdit}
        alumno={alumnoSeleccionado}
      />

      <Button
        mode="contained"
        onPress={() => setOrdenAsc(!ordenAsc)}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        buttonColor="black"
        textColor="white"
        icon={() => (
          <MaterialIcons
            name={ordenAsc ? "arrow-downward" : "arrow-upward"}
            size={20}
            color="white"
          />
        )}
      >
        {ordenAsc ? "Orden A-Z" : "Orden Z-A"}
      </Button>

      <FlatList
        data={alumnosOrdenados}
        keyExtractor={(item) => item.matricula}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.matricula}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            descriptionStyle={{ color: "black" }}
            left={() => <MaterialIcons name="account-circle" size={40} />}
            right={() => (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Button
                  mode="outlined"
                  onPress={() => handleEditar(item)}
                  textColor="purple"
                  style={{ borderColor: "purple" }}
                  compact
                >
                  Editar
                </Button>
                <Button
                  mode="contained"
                  onPress={() => handleBorrar(item.matricula)}
                  buttonColor="red"
                  textColor="white"
                  compact
                >
                  Borrar
                </Button>
              </View>
            )}
          />
        )}
      />
    </>
  );
}