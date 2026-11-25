
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@catalogo_jogos:favoritos';

// Recupera os jogos favoritos armazenados
export const buscarFavoritos = async () => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);

    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

// Salva a lista de favoritos
export const salvarFavoritos = async (favoritos) => {
  try {
    await AsyncStorage.setItem(
      CHAVE_FAVORITOS,
      JSON.stringify(favoritos)
    );
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
};
