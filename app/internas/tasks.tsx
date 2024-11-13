import { useRouter } from 'expo-router'; // Importando o hook useRouter para navegação
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Animated, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Tasks() {
  const router = useRouter();  // Criando o hook de navegação

  const handleNavigate = () => {
    // Função que navega para a página de criação de história
    router.push('/internas/user'); // Substitua '/create-story' pela rota da sua página de criação
  };

  return (
    <Animated.View style={styles.container}>
      {/* StatusBar */}
      <ExpoStatusBar style="light" backgroundColor="#000" />

      <ImageBackground style={styles.logo} source={require('./images/RPG.png')}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>RPG - O que é e como funciona?</Text>
            <Text style={styles.paragraph}>
              RPG (Role-Playing Game, ou Jogo de Interpretação de Papéis) é um tipo de jogo onde os jogadores assumem os papéis de personagens fictícios e vivem aventuras em mundos imaginários. Durante o jogo, os participantes criam e desenvolvem seus personagens, geralmente com habilidades e características únicas, e interagem com outros jogadores e o ambiente de maneira que simula um mundo real ou fantástico.
            </Text>
            <Text style={styles.paragraph}>
              Existem várias formas de RPG, mas as mais comuns são os RPGs de mesa (como Dungeons & Dragons) e os RPGs digitais (como Final Fantasy, The Witcher e World of Warcraft).
            </Text>
            <Text style={styles.subTitle}>RPG de Mesa</Text>
            <Text style={styles.paragraph}>
              No RPG de mesa, os jogadores se reúnem em torno de uma mesa, onde um mestre de jogo (o "narrador") guia a história e apresenta os desafios, enquanto os jogadores tomam decisões baseadas em suas ações e características de seus personagens. O mestre de jogo pode descrever cenários, criaturas e situações, enquanto os jogadores escolhem como seus personagens reagem a esses eventos.
            </Text>
            <Text style={styles.subTitle}>RPG Digital</Text>
            <Text style={styles.paragraph}>
              No RPG digital, os jogadores controlam seus personagens em um mundo virtual, muitas vezes com a ajuda de um computador ou console de videogame. Esses jogos podem ter histórias complexas, missões para os jogadores cumprirem e mundos abertos para explorar.
            </Text>
            <Text style={styles.paragraph}>
              A principal diferença em relação ao RPG de mesa é que, no RPG digital, o jogo é guiado por códigos e inteligência artificial, enquanto no RPG de mesa, as interações entre jogadores e o mestre de jogo são fundamentais para o progresso da história.
            </Text>
            <Text style={styles.subTitle}>Características Comuns dos RPGs:</Text>
            <Text style={styles.paragraph}>
              • Criação de Personagem: Os jogadores geralmente começam criando um personagem, escolhendo sua classe (como guerreiro, mago ou ladrão), habilidades, raça (como elfo, anão ou humano) e outras características. Cada decisão molda o papel do personagem no jogo e influencia suas interações com o mundo.
            </Text>
            <Text style={styles.paragraph}>
              • História e Narrativa: RPGs são fortemente baseados em histórias. O enredo é muitas vezes complexo, com várias ramificações e escolhas que podem mudar o rumo do jogo. Isso cria uma experiência imersiva onde os jogadores podem sentir que realmente fazem parte daquele mundo.
            </Text>
            <Text style={styles.paragraph}>
              • Interação com o Mundo: Em RPGs, os personagens interagem com o ambiente e outras figuras do jogo. Muitas vezes, a narrativa é construída por essas interações e pelas escolhas feitas pelos jogadores.
            </Text>
            <Text style={styles.paragraph}>
              • Progressão e Evolução: Os personagens geralmente começam em um nível baixo e vão progredindo ao longo do jogo. Eles ganham pontos de experiência (XP), melhoram suas habilidades e se tornam mais poderosos conforme superam desafios.
            </Text>
            <Text style={styles.paragraph}>
              • Colaboração e Competição: Em muitos RPGs, especialmente em jogos de mesa, os jogadores trabalham em equipe para alcançar objetivos comuns. No entanto, também existem RPGs onde os jogadores competem uns com os outros.
            </Text>

            {/* Botão para navegar */}
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
              <Text style={styles.buttonText}>Faça sua História</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,  // Para garantir que o conteúdo não fique cortado
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para dar contraste ao texto
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347', // Cor do botão
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
