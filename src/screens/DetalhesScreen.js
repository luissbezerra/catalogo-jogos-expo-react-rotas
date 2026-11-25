
import React, { useEffect, useState } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

import {
  Text,
  Button,
  Card,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';

import {
  buscarFavoritos,
  salvarFavoritos,
} from '../storage/favoritosStorage';

export default function DetalhesScreen({ route }) {
  const { jogo } = route.params;

  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Verifica se o jogo já está nos favoritos
  useEffect(() => {
    const verificarFavorito = async () => {
      const favoritos = await buscarFavoritos();

      const encontrado = favoritos.some(
        (item) => item.id === jogo.id
      );

      setFavorito(encontrado);
      setCarregando(false);
    };

    verificarFavorito();
  }, [jogo.id]);

  // Adiciona ou remove o jogo dos favoritos
  const alternarFavorito = async () => {
    const favoritos = await buscarFavoritos();

    let novaLista;

    if (favorito) {
      novaLista = favoritos.filter(
        (item) => item.id !== jogo.id
      );
    } else {
      novaLista = [...favoritos, jogo];
    }

    await salvarFavoritos(novaLista);

    setFavorito(!favorito);
  };

  return (
    <ScrollView style={styles.container}>

      <Image
        source={{ uri: jogo.thumbnail }}
        style={styles.capa}
        resizeMode="cover"
      />

      <View style={styles.conteudo}>

        <Text variant="headlineSmall" style={styles.titulo}>
          {jogo.title}
        </Text>

        <View style={styles.informacoes}>
          <Text style={styles.etiqueta}>
            Gênero: {jogo.genre}
          </Text>

          <Text style={styles.etiqueta}>
            Plataforma: {jogo.platform}
          </Text>

          <Text style={styles.etiqueta}>
            Lançamento: {jogo.release_date || 'Não informado'}
          </Text>
        </View>

        <Divider style={styles.divisor} />

        <Text variant="titleMedium" style={styles.subtitulo}>
          Sobre o jogo
        </Text>

        <Text variant="bodyMedium" style={styles.descricao}>
          {jogo.description || jogo.short_description}
        </Text>

        <Divider style={styles.divisor} />

        <Text variant="titleMedium" style={styles.subtitulo}>
          Desenvolvedor
        </Text>

        <Text style={styles.texto}>
          {jogo.developer || 'Não informado'}
        </Text>

        <Text variant="titleMedium" style={styles.subtitulo}>
          Publicadora
        </Text>

        <Text style={styles.texto}>
          {jogo.publisher || 'Não informado'}
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.subtitulo}>
              Informações adicionais
            </Text>

            <Text style={styles.texto}>
              Tipo: {jogo.game_url ? 'Jogo online' : 'Não informado'}
            </Text>

            <Text style={styles.texto}>
              ID do jogo: {jogo.id}
            </Text>
          </Card.Content>
        </Card>

        {carregando ? (
          <ActivityIndicator
            animating={true}
            color="#6c5ce7"
            style={styles.carregamento}
          />
        ) : (
          <Button
            mode="contained"
            icon={favorito ? 'heart' : 'heart-outline'}
            buttonColor={favorito ? '#e84393' : '#6c5ce7'}
            onPress={alternarFavorito}
            style={styles.botao}
          >
            {favorito
              ? 'Remover dos favoritos'
              : 'Adicionar aos favoritos'}
          </Button>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  capa: {
    width: '100%',
    height: 230,
  },

  conteudo: {
    padding: 18,
  },

  titulo: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 16,
  },

  informacoes: {
    gap: 10,
  },

  etiqueta: {
    color: '#b2bec3',
    fontSize: 14,
  },

  divisor: {
    marginVertical: 18,
    backgroundColor: '#444444',
  },

  subtitulo: {
    color: '#a29bfe',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 8,
  },

  descricao: {
    color: '#dfe6e9',
    lineHeight: 23,
  },

  texto: {
    color: '#b2bec3',
    fontSize: 14,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#1e1e26',
    marginTop: 18,
    marginBottom: 20,
  },

  botao: {
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 5,
  },

  carregamento: {
    marginVertical: 25,
  },
});