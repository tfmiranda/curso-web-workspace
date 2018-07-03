REM Script de inicializacao de instancia mongodb no Windows
REM Tiago Miranda, 07/2018
@ECHO OFF
echo Executando script de inicializacao do banco MongoDB

REM Altera o caminho para o diretorio instalacao mongodb
F:
cd F:\MongoDB\Server\3.6\bin\

REM Executa o mongodb com a configuracao mongod.cfg, crie caso necessario
mongod.exe --config mongod.cfg

