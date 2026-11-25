
import React, { useEffect, useState } from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

import {
  Text,
  Searchbar,
  Card,
  Chip,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

export default function CatalogoScreen({ navigation }) {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Consulta a API FreeToGame
  const buscarJogos = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch(
        'https://www.freetogame.com/api/games'
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os jogos.');
      }

      const json = await resposta.json();
      setJogos(json);

    } catch (error) {
      setErro(error.message);

    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarJogos();
  }, []);

  // Filtra os jogos pelo nome ou gênero
  const jogosFiltrados = busca.trim() === ''
    ? jogos.slice(0, 30)
    : jogos.filter((jogo) => {
        const termo = busca.toLowerCase();

        return (
          jogo.title.toLowerCase().includes(termo) ||
          jogo.genre.toLowerCase().includes(termo)
        );
      });

  // Abre os detalhes do jogo selecionado
  const abrirDetalhes = (jogo) => {
    navigation.navigate('Detalhes', { jogo });
  };

  // Exibe carregamento
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator
          animating={true}
          size="large"
          color="#6c5ce7"
        />

        <Text style={styles.textoInfo}>
          Carregando catálogo de jogos...
        </Text>
      </View>
    );
  }

  // Exibe erro
  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>
          Ops! {erro}
        </Text>

        <Button
          mode="contained"
          onPress={buscarJogos}
          style={styles.botao}
        >
          Tentar novamente
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.topo}>
        <Text variant="titleMedium" style={styles.subtitulo}>
          Encontre seu próximo jogo favorito
        </Text>

        <Button
          mode="outlined"
          icon="heart"
          textColor="#ffffff"
          onPress={() => navigation.navigate('Favoritos')}
        >
          Favoritos
        </Button>
      </View>

      <Searchbar
        placeholder="Pesquisar por nome ou gênero..."
        value={busca}
        onChangeText={setBusca}
        style={styles.pesquisa}
        inputStyle={styles.textoPesquisa}
        iconColor="#6c5ce7"
      />

      <FlatList
        data={jogosFiltrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"

        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhum jogo encontrado para "{busca}".
          </Text>
        }

        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => abrirDetalhes(item)}
          >
            <Card.Cover
              source={{ uri: item.thumbnail }}
              style={styles.capa}
            />

            <Card.Content style={styles.info}>
              <Text
                variant="titleMedium"
                style={styles.nome}
              >
                {item.title}
              </Text>

              <View style={styles.badges}>
                <Chip
                  compact
                  style={styles.badge}
                  textStyle={styles.textoBadge}
                >
                  {item.genre}
                </Chip>

                <Chip
                  compact
                  style={styles.badgePlataforma}
                  textStyle={styles.textoPlataforma}
                >
                  {item.platform}
                </Chip>
              </View>

              <Text
                variant="bodyMedium"
                numberOfLines={2}
                style={styles.descricao}
              >
                {item.short_description}
              </Text>

              <Button
                mode="contained"
                buttonColor="#6c5ce7"
                onPress={() => abrirDetalhes(item)}
                style={styles.botaoDetalhes}
              >
                Ver detalhes
              </Button>

            </Card.Content>
          </Card>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  subtitulo: {
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },

  pesquisa: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1e1e26',
    borderRadius: 10,
  },

  textoPesquisa: {
    color: '#ffffff',
    fontSize: 14,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: '#1e1e26',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },

  capa: {
    height: 170,
  },

  info: {
    paddingTop: 12,
  },

  nome: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },

  badge: {
    backgroundColor: '#6c5ce7',
  },

  textoBadge: {
    color: '#ffffff',
  },

  badgePlataforma: {
    backgroundColor: '#2d3436',
  },

  textoPlataforma: {
    color: '#dfe6e9',
  },

  descricao: {
    color: '#b2bec3',
    lineHeight: 20,
    marginBottom: 12,
  },

  botaoDetalhes: {
    marginBottom: 8,
  },

  botao: {
    marginTop: 16,
  },

  textoInfo: {
    color: '#ffffff',
    marginTop: 12,
  },

  textoErro: {
    color: '#ff7675',
    textAlign: 'center',
  },

  textoVazio: {
    color: '#b2bec3',
    textAlign: 'center',
    marginTop: 40,
  },
});
