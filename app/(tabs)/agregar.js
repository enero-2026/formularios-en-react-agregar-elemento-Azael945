import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Portal, TextInput, Button, Text } from "react-native-paper";

export default function Agregar({ visible, onDismiss, onAdd }) {
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");

  const limpiarCampos = () => {
    setNombre("");
    setMatricula("");
  };

  const handleAdd = () => {
    if (!nombre || !matricula) return;

    onAdd({
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
          backgroundColor: "#1c1c1c", // fondo oscuro
          padding: 20,
          margin: 20,
          borderRadius: 10
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
          Agregar Alumno
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
          onPress={handleAdd}
          buttonColor="black"
          textColor="white"
        >
          Agregar
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