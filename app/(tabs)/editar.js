import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Modal, Portal, TextInput, Button, Text } from "react-native-paper";

export default function Editar({ visible, onDismiss, onEdit, alumno }) {
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");

  // Cuando se abre el modal, carga los datos del alumno seleccionado
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

    onEdit({
      nombre: nombre.toUpperCase(),
      matricula: matricula
    });

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

        <Button
          mode="contained"
          onPress={handleEdit}
          buttonColor="purple"
          textColor="white"
        >
          Guardar cambios
        </Button>

        <Button
          onPress={handleCancel}
          style={{ marginTop: 10 }}
          buttonColor="black"
          textColor="white"
          mode="contained"
        >
          Cancelar
        </Button>
      </Modal>
    </Portal>
  );
}