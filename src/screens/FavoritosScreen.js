
import React, { useCallback, useState } from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

import {
  Text,
  Card,
  Button,
} from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import {
  buscarFavoritos,
  salvarFavoritos,
} from '../storage/favoritosStorage';

export default function FavoritosScreen({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Atualiza os favoritos sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      const carregarFavoritos = async () => {
        setCarregando(true);

        const dados = await buscarFavoritos();

        setFavoritos(dados);
        setCarregando(false);
      };

      carregarFavoritos();
    }, [])
  );

  // Remove um jogo dos favoritos
  const removerFavorito = async (id) => {
    const novaLista = favoritos.filter(
      (jogo) => jogo.id !== id
    );

    await salvarFavoritos(novaLista);

    setFavoritos(novaLista);
  };

  // Abre os detalhes do jogo
  const abrirDetalhes = (jogo) => {
    navigation.navigate('Detalhes', { jogo });
  };

  return (
    <View style={styles.container}>

      <Text variant="headlineSmall" style={styles.titulo}>
        Meus jogos favoritos
      </Text>

      {carregando ? (
        <Text style={styles.texto}>
          Carregando favoritos...
        </Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}

          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text variant="titleMedium" style={styles.texto}>
                Você ainda não possui jogos favoritos.
              </Text>

              <Text style={styles.subtexto}>
                Explore o catálogo e adicione seus jogos preferidos!
              </Text>

              <Button
                mode="contained"
                buttonColor="#6c5ce7"
                onPress={() => navigation.navigate('Catalogo')}
                style={styles.botao}
              >
                Explorar catálogo
              </Button>
            </View>
          }

          renderItem={({ item }) => (
            <Card style={styles.card}>

              <Card.Cover
                source={{ uri: item.thumbnail }}
                style={styles.capa}
              />

              <Card.Content style={styles.info}>

                <Text variant="titleMedium" style={styles.nome}>
                  {item.title}
                </Text>

                <Text style={styles.genero}>
                  {item.genre} | {item.platform}
                </Text>

              </Card.Content>

              <Card.Actions style={styles.acoes}>

                <Button
                  textColor="#a29bfe"
                  onPress={() => abrirDetalhes(item)}
                >
                  Detalhes
                </Button>

                <Button
                  textColor="#ff7675"
                  onPress={() => removerFavorito(item.id)}
                >
                  Remover
                </Button>

              </Card.Actions>

            </Card>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  titulo: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: '#1e1e26',
    marginBottom: 16,
    overflow: 'hidden',
  },

  capa: {
    height: 160,
  },

  info: {
    paddingTop: 12,
  },

  nome: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  genero: {
    color: '#b2bec3',
    marginTop: 6,
  },

  acoes: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  vazio: {
    alignItems: 'center',
    padding: 24,
    marginTop: 50,
  },

  texto: {
    color: '#ffffff',
    textAlign: 'center',
  },

  subtexto: {
    color: '#b2bec3',
    textAlign: 'center',
    marginTop: 12,
  },

  botao: {
    marginTop: 24,
  },
});