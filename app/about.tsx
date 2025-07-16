import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';
import Unorderedlist from 'react-native-unordered-list';

export default function AboutScreen() {
   const [checked, setChecked] = React.useState(true);
  const [switchPage, setSwitchPage] = React.useState(true);
  const [options, setOptions] = useState([
    { label: 'CGU', value: 'CGU' },
    { label: 'Mentions légales', value: 'mentions' },
  ]);

  const changeView = () => {
    setSwitchPage(!switchPage);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.switchView}>
        <SwitchSelector
          options={options}
          initial={0}
          selectedColor="#fff"
          buttonColor="orange"
          bold={true}
          hasPadding={true}
          valuePadding={2}
          borderColor="#fff"
          borderRadius={5}
          textContainerStyle={{
            fontWeight: 'bold',
          }}
          onPress={() => changeView()}
        />
      </View>
      {switchPage ? (
        <ScrollView contentContainerStyle={{ padding: 10, margin: 10 }}>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>01: GENERALITES ET DEFINITIONS</Text>
            <Text>
              La MUPEMENETCI propose un service d’accompagnement de ses adhérents via une
              application mobile.
            </Text>
            <Text>L’application mobile est dénommée MYMUPEMENET.</Text>
            <Text>
              Les présentes Conditions Générales d’Utilisation (« CGU ») règlementent l’accès et
              l’utilisation de l’application.
            </Text>
            <Text>
              L’utilisation de l’Application est subordonnée à une acceptation sans réserve des
              présentes CGU.
            </Text>
            <Text>
              Les présentes CGU sont susceptibles d’être modifiées et/ou complétées à tout moment.
              MYMUPEMENET en informera les Utilisateurs par voie de notification sur l’Application.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>DEFINITIONS</Text>
            <Text>
              Les termes des présentes CGU commençant par une majuscule ont le sens précisé dans les
              définitions suivantes :
            </Text>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>APPLICATION :</Text>
              <Text>Désigne l’application mobile MYMUPEMENET.</Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>COMPTE :</Text>
              <Text>
                Désigne l’espace privatif de l’Utilisateur accessible depuis la Plateforme.
              </Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>DONNEES PERSONNELLES :</Text>
              <Text>
                Désigne toutes informations se personne physique identifiée ou identifiable.
              </Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>PLATEFORME :</Text>
              <Text>Désigne l’application MYMUPEMENET</Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>SERVICES :</Text>
              <Text>Désigne l’ensemble des services proposés par le biais de la Plateforme.</Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>SITE :</Text>
              <Text>Désigne le site www.mupemenetci.org</Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>UTILISATEUR :</Text>
              <Text>Désigne toute personne disposant d’un Compte sur la Plateforme.</Text>
            </View>
            <View style={styles.subparagraphes}>
              <Text style={styles.subsubtitle}>VISITEUR :</Text>
              <Text>Désigne toute personne qui accède à la Plateforme.</Text>
            </View>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>02: CONDITIONS D'ACCES AU SITE ET A L'APPLICATION</Text>
            <Text>
              Les Utilisateurs du Site et de l’Application déclarent être capables de contracter.
            </Text>
            <Text>
              L’accès au Site et à l’Application s’effectue depuis tout terminal disposant d’un
              accès à un réseau de télécommunications permettant l’accès au réseau Internet.Tous les
              coûts afférents à l’accès sont exclusivement à la charge de l’Utilisateur ou du
              Visiteur, seul responsable du bon fonctionnement de son équipement informatique
              Internet.
            </Text>
            <Text>
              L'accès à MYMUPEMENET et ses prestataires ne garantissent pas la disponibilitéde la
              Plateforme 24 heures sur 24 et 7 jours sur 7.
            </Text>
            <Text>
              L’accès au Site et à l’Application pourra être interrompu pour des raisons de
              maintenance et/ou tout autre modification. La responsabilité de MYMUPEMENET ne saurait
              être engagée en cas d’impossibilité d’accès au site et/ou à l’application.
            </Text>
            <Text>
              Pour bénéficier des Services, l’Utilisateur s’inscrit à partir de son adresse
              électronique ou télécharge l’application via son téléphone.
            </Text>
            <Text>
              L’Utilisateur s’engage à fournir des informations exactes, complètes et véridiques.
              L’Utilisateur s’engage à renseigner le plus précisément possible ses informations. Si
              ces dernières venaient à être modifiées, l’Utilisateur s’engage à les modifier dans
              les plus brefs délais.
            </Text>
            <Text>
              L’Utilisateur est responsable de la confidentialité des identifiants de son Compte.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>
              03: RESPONSABILITE ET OBLIGATIONS DES UTILISATEURS ET DES VISITEURS
            </Text>
            <Text>
              Les Utilisateurs et les Visiteurs sont seuls responsables de leur utilisation de la
              Plateforme.
            </Text>
            <Text>Les Utilisateurs et les Visiteurs s’engagent à :</Text>
            <Unorderedlist>
              <Text>
                Ne pas accéder et/ou utiliser la Plateforme et/ou les Services à des fins illicites
                et/ou d’une manière ayant pour objet de causer un dommage à MYMUPEMENET et/ou à un
                tiers;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                Ne pas porter atteinte aux droits, notamment de propriété intellectuelle, de
                MYMUPEMENET et/ou de tiers ;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                Ne pas commercialiser directement ou indirectement les Services Plateforme ;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                Ne pas procéder à l’extraction par transfert permanent ou temporaire de la totalité
                ou d’une partie qualitativement ou quantitativement substantielle du contenu d’une
                ou plusieurs bases de données accessibles sur le Site et/ou sur l'Application sur un
                autre support, par tout moyen et sous toute forme que ce soit, en ce compris à des
                fins d'utilisation ou de consultation par un média et/ou un procédé(s) non
                autorisé(s) par MYMUPEMENET ;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                Vérifier régulièrement qu’ils disposent de la dernière version à jour de
                l’Application, dans une version supportée par leur terminal.
              </Text>
            </Unorderedlist>
            <Text>
              En cas de manquement à l’une de ces obligations et, sans que cette liste ne soit
              limitative, les Utilisateurs et les Visiteurs reconnaissent et acceptent que
              MYMUPEMENET sera en droit de mettre fin à leurs relations sans délai ni indemnité,
              avec privation immédiate d'accès à tout ou partie de la Plateforme et/ou des Services,
              sans préjudice de tout éventuel dommages-intérêts en cas de préjudice subi par
              MYMUPEMENET du fait des agissements fautifs de la part des Utilisateurs et/ou des
              Visiteurs.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>04: RESPONSABILITE ET OBLIGATIONS DE MYMUPEMENET</Text>
            <Text>La responsabilité de MYMUPEMENET ne saurait être engagée :</Text>
            <Unorderedlist>
              <Text>
                En cas d’erreur technique et/ou matérielle et/ou de perte de données engendrées par
                l’Utilisateur dans le cadre de l’utilisation du Site ou de l’Application ;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                En cas de dysfonctionnement des services informatiques, notamment relatifs aux
                outils et logiciels proposés sur le Site et/ou surl’Application ;
              </Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>
                En cas de retard ou d’inexécution, lorsque la cause du retard ou de l'inexécution
                est liée à un cas de force majeure ivoiriennes, telle qu'elle est définie par la
                jurisprudence des juridictions.
              </Text>
            </Unorderedlist>
            <Text>
              La responsabilité de MYMUPEMENET ne pourra être engagée que pour les dommages directs
              subis par l’Utilisateur, résultant d’un manquement à ses obligations contractuelles ou
              aux présentes CGU.
            </Text>
            <Text>
              MYMUPEMENET s’engage à mettre en œuvre tous les moyens nécessaires afin d’assurer au
              mieux la fourniture des Services aux Utilisateurs.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>05: PROTECTION DES DONNEES PERSONNELLES</Text>
            <Text>
              Dans le cadre de l’utilisation de la Plateforme, MYMUPEMENET collecte et traite les
              Données personnelles communiquées par l’Utilisateur ou le Visiteur lors de son
              inscription ainsi que celles résultant de son utilisation de la Plateforme.
            </Text>
            <Text>
              Pour tout savoir sur la manière dont MYMUPEMENET traite et collecte les Données
              personnelles des Utilisateurs et des Visiteurs, consultez la Politique de
              Confidentialité de MYMUPEMENET.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>06: LIEN VERS D'AUTRES PAGES INTERNET</Text>
            <Text>
              La Plateforme peut inclure des liens hypertexte vers d’autres sites Internet ; ces
              liens font quitter à l’Utilisateur ou au Visiteur le Site et/ou l’Application.
            </Text>
            <Text>
              Ces liens sont fournis pour la seule commodité de l’Utilisateur ou du Visiteur et ne
              peuvent engager la responsabilité de auxquels ils renvoient.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>07: PROPRIETE INTELECTUELLE</Text>
            <Text>
              MYMUPEMENET quant aux contenus, publicités, produits et services L’ensemble des
              éléments reproduits sur le Site et l’Application et notamment les textes,
              commentaires, illustrations et marques sont protégés par le droit national et
              international de la propriété intellectuelle. Ces éléments sont la propriété exclusive
              de MYMUPEMENET et/ou de ses partenaires, titulaires des droits de propriété
              intellectuelle y afférent.
            </Text>
            <Text>
              Toute reproduction totale ou partielle des éléments accessibles sur le Site et sur
              l’Application sans l’autorisation expresse de MYMUPEMENET et/ou de ses partenaires est
              strictement interdite.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>08: FERMETURE DU COMPTE D'UN UTILISATEUR</Text>
            <Text>
              L’Utilisateur peut, à tout moment, se désinscrire ou se désabonner du Site et/ou de
              l’Application sans frais et sans motif.
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>09: DIVISIBILITE</Text>
            <Text>
              Si une partie des présentes CGU devait s’avérer illégale, invalide ou Inapplicable
              pour quelque raison que ce soit, les dispositions en question seront réputées non
              écrites, sans remettre en cause la validité des autres dispositions qui continueront
              de s’appliquer entre les Utilisateurs ou Visiteurs et MYMUPEMENET .
            </Text>
          </View>
          <View style={styles.paragraphes}>
            <Text style={styles.subtitle}>10: DROIT APPLICABLE</Text>
            <Text>
              Les présentes CGU sont régies par le droit ivoirien et tout litige ayant trait à
              l’Utilisation de la Plateforme sera soumis à la juridiction des tribunaux ivoiriens
              compétents.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ flexDirection: 'row', position: 'relative', right: '6%' }}>
              <RadioButton
                value={checked}
                status={checked === true ? 'checked' : 'unchecked'}
                color="orange"
                onPress={() => setChecked(!checked)}
              />
              <Text style={{ position: 'relative', top: '4%', fontWeight: '500' }}>
                Je confirme avoir lu.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 10, margin: 10 }}>
          <View>
            <Text style={styles.title}>MUPEMENET-CI Côte d’Ivoire</Text>
            <Text>Mymenet, application de gestion de mutuelle proposée par la MUPEMENET-CI</Text>
          </View>
          <View>
            <Text style={styles.title}>EDITEUR</Text>
            <Text>Finance Technology Consultants (FTC)</Text>
          </View>
          <View>
            <Text style={styles.title}>CONCEPTION ET REALISATION</Text>
            <Text>Finance Technology Consultants (FTC)</Text>
          </View>
          <View>
            <Text style={styles.title}>CONTACTS</Text>
            <Text>
              Pour tous renseignements vous pouvez contacter le service client de la MUPEMENT-CI au
              20225743/20225737
            </Text>
          </View>
          <View>
            <Text style={styles.title}>NOTICE IMPORTANTE</Text>
            <Text>
              Chers mutualiste, vos données de connexion sont personnelles et confidentiels, ne les
              montrez à personne
            </Text>
          </View>
          <View>
            <Text style={styles.title}>HEBERGEMENT</Text>
            <Text>MUPEMENET-CI </Text>
            <Text>Côte d’Ivoire Abidjan, Immeuble le Mali</Text>
          </View>
          <View>
            <Text style={styles.title}>CETTE APPLICATION EST LA PROPRIETE DE LA MUPEMENET-CI.</Text>
            <Text>Copyright MUPEMENET-CI 2022-2023 All rights reserved</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchView: {
    marginTop: '3%',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  subsubtitle: {
    fontSize: 18,
    color: 'green',
  },
  paragraphes: {
    marginBottom: '10%',
  },
  subparagraphes: {
    marginLeft: '3%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  title: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
