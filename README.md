## Warstwa front-endowa Aplikacji scrappującej Wolfram wraz z jej implementacją w aplikacji giełdowej

**Jest to aplikacja tworzona na potrzeby pracy zaliczeniowej z przedmiotu Technologie internetowe. Niestety serwer ze scrapperem nie jest już utrzymywany co powoduje, że nie ma możliwości uruchomienia aplikacji z danymi. Można obejrzeć kod źródłowy, otworzyć aplikacje bez danych oraz zobaczyc jej docelowe działanie na załączonych screenach w dokumentacji**.


**Wygląd aplikacji**
https://prnt.sc/X3ZvoZQVXZJR

https://prnt.sc/rmXSsDCoBkGD

https://prnt.sc/VcEDB2IXXrS_



**Nazwa robocza**: Wolfram 

**Technologie**: .NET, React.JS 

**Opis**: Wolfram jest uniwersalnym serwisem backendowym, działającym na zasadzie „web scrapingu” danych.  
Web Scraping to technika wyodrębniania danych ze stron internetowych, która zastępuje ręczne, powtarzalne wpisywanie lub kopiowanie i wklejanie. Dodatkowo pozyskane dane często są przechowywane w ustrukturyzowanym formacie. Obecnie skrobanie stron internetowych jest szeroko stosowane i ma wiele zastosowań, m.in.: 
firmy mogą pobierać informacje odnoście produktów swojej konkurencji, 
można pobierać informacje o potencjalnych klientach (osoby fizyczne lub inne firmy), 
porównywanie cen w celu znalezienia najtańszej oferty (ceneo.pl), 
portale agregujące oferty o prace mogą pobierać informacje o nowych ofertach pracy z innych źródeł, 
portale o nieruchomościach mogą pobierać dane o nowo powstałych projektach inwestycyjnych, 
Aplikacja Wolfram jest uniwersalnym szkieletem scrapującym, który można dopasowywać pod potrzeby potencjalnego klienta. Za przedstawienie działania aplikacji posłuży symulacja zamówienia na system scrapujący portal Google Finanse, w celu pobierania, gromadzenia i przedstawiania wyników giełdowych. W tym celu stworzony kod scrapujący strone Google Finance, aplikacja pozwalająca na dodawanie i usuwanie obserwowanych indeksów giełdowych, a także cała aplikacja Webowa obsługująca odczyty po stronie klienta.  

**Opis warstwy Frontend**

Aplikacja webowa do obsługi serwisu scrapującego została napisana przy użyciu frameworku React.JS, wraz z dedykowaną biblioteką Material UI.  
Aplikacja dzieli się na dwie podaplikacje:  

Server.js – uruchamiany w pierwszej kolejności obsługuje wszystkie zapytania do bazy danych 
App.js – aplikacja wyświetlana na ekranie. 

Obie aplikacje działają w czasie rzeczywistym jednocześnie, co daje możliwość regularnego pobierania aktualnych odczytów giełdowych. Aplikacja może pobierać nawet odczyt co sekundę.


**Instalacja i uruchomienie**

Należy otworzyć folder za pomocą środowiska IDE lub poprzez terminal systemowy. W przypadku korzystania ze środowiska IDE należy otworzyć terminal w programie. W terminalu należy udać się za pomocą komendy “cd” do folderu “server” i w nim uruchomić komendę “node index.js”. 

Po wywołaniu tej komendy zostanie uruchomiony serwer frontendowy obsługujący zapytania do bazy danych. 

Jeżeli aplikacja jest uruchamiana poraz pierwszy należy pobrać wszystkie zależności i paczki do aplikacji. Do tego oraz do dalszej pracy z aplikacją koniecznym jest zainstalowanie Node Package Manager. 

Po zainstalowaniu NPM można pobrać zależności za pomocą komendy npm install. 

Kolejnym krokiem jest uruchomienie w nowym terminalu w folderze głównym aplikacji komendy “npm run dev”. Komenda odpowiada za uruchomienie aplikacji na lokalnym serwerze pod adresem http://localhost:3000. 

Jeżeli repozytorium nie posiadało błędów składniowych w plikach js oraz scss aplikacja powinna się uruchomić. W przeciwnym wypadku należy przeanalizować odpowiedź webpacka w terminalu i usunąć błędy. 

Ostatnim krokiem jest zainstalowanie w przeglądarce internetowej rozszerzenia odpowiadającego za wyłączanie polityki CORS. Z racji, że lokalne wersje nie posiadają zabezpieczenia HTTP, połączenie aplikacji z backendem będzie blokowane przez politykę CORS.


**Funkcje aplikacji**

Aplikacja należy do typu aplikacji zbierających i wyświetlających dane na różne sposoby. Aplikacja przedstawia odczyty ze Scrappera, w formie wykresów oraz statystyk liczbowych. Program posiada moduły:

Wartość giełdy - pokazuje sumę wartości wszystkich analizowanych indeksów giełdowych bazująć na ostatnim odczycie. Dodatkowo zlicza sumę wartości poprzedniego odczytu oraz oblicza różnicę procentową w postaci czerwonej gdy jest spadek i zielonej podczas wzrostu.

Liczba indeksów - pokazuje liczbę indeksów podanych analizie

Największy przyrost – pokazuje indeks giełdowy o największym wzroście w stosunku do poprzedniego odczytu oraz wartość przyrostu

Największy spadek – analogicznie do funkcji powyżej w tym, że analizowany jest indeks o największym spadku

Główny wykres giełdowy - pokazuje wykres z odczytami z ostatnich 7 dni dla każdego indeksu. Wykres ma możliwość wyłączania i włączania pojedynczych warstw z indeksami. 

Wykres analizujący bieżący i poprzedni odczyt – pokazuje dwa słupki z bieżącym i poprzednim odczytem, pozwalając na śledzenie nagłych wzrostów lub spadków giełdowych. 

**Dodatkowe funkcje możliwe do implementacji**

Aplikacja została stworzona na potrzeby przedstawienia możliwości aplikacji Wolfram, jednakże zostawiono otwarte rozwiązania do dalszego wdrażania tak aby można było w pełni dostosować program do potrzeb. Do takich rozwiązan należą:

Logowanie

Panel użytkownika

Wyszukiwarka

System powiadomien

**Implementacja serwera lokalnego i zapytania do bazy danych**

Server.js odpowiedzialny jest za obsługę zapytan do bazy danych oraz tworzenie API między bazą danych a aplikacją webową. 
Do korzystania z serwera koniecznym jest zainstalowanie express.js oraz mssql najlepiej za pomocą komendy npm install w folderze server. 
