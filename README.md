# UEK335_Movie-Details-Checker

## Ressourcen
- [Figma](https://www.figma.com/design/Isna0olURQs0Gaiw8iChIl/Wireframe-%26-Prototype?node-id=6-2&node-type=canvas&t=iZnh6C4Wfiqh4YFG-0)
- [Dokumentation]()

## Frameworks
- React Native
- React Native Paper

## Installationsanleitung

### 1. Voraussetzungen
Diese Tools müssen bereits installiert sein.
- Node.js inklusive NPM
- Yarn
- Docker

### 2. Container lokal laufen lassen

```bash
docker run -p 3000:3000 --name restdb -d devnyzh/rest-jsondb
```

### 3. Git Repository Klonen

```bash
git clone https://github.com/MaximilianNoethe/UEK335_Movie-Details-Checker.git
```

### 3. Installation
Öffne den Ordner movies im frisch geklonten Repository.
In der Kommandozeile gib folgenden Befehl ein:
```bash
cd UEK335_Movie-Details-Checker/movie-checker
yarn install 
```
### 6. Anpassung der IP-Adresse
Im File  `Api.ts` hat es eien Zeile welche angepasst werden muss. 
Finde deine eigene IP-Adresse raus (natürlich von deinem Rechner), und füge sie in dieser Zeile ein.

![image](https://github.com/user-attachments/assets/d84fea2b-4ced-476c-b986-e6bcd481e780)


### 5. Start der Applikation
Nach der erfolgreichen Installation der Pakete kann die Applikation nun gestartet werden.
Folgender Befehl muss eingegeben werden.

```bash
yarn start 
```

### 6. Applikation öffnen
Lade nun aus dem Apple App Store oder Google Play Store folgende Applikation herunter: [Expo Go App](https://expo.dev/go)

Nachdem der Schritt drei ausgeführt wurde, sollte so ein QR-Code erscheinen:
![image](https://github.com/user-attachments/assets/2b6382d9-a960-4e3f-948a-56dd58153b6d)


Dieser muss in IOS über die Kamera-App gescannt werden und in Android in der Expo Go App selbst.


Gratulation, 🎉 Die App sollte jetzt funktionieren. <br>
Für mehr Informationen oder bei Problemen besuchen Sie bitte diese Seite: [Expo Set-up Tutorial](https://docs.expo.dev/get-started/set-up-your-environment/).

### 7. Beenden der Applikation
Mit einem einfachen `Ctrl + C` kann das Programm beendet werden. 

