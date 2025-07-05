import React, { useState, useEffect } from "react";

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const totalNumbers = 180;
  const pricePerNumber = 10;

  const numbersArray = Array.from({ length: totalNumbers }, (_, i) => i + 1);

  const handleSelectNumber = (number) => {
    if (selectedNumbers.includes(number)) return;
    setCurrentSelection(number);
    setShowQRCode(true);
  };

  const confirmPayment = () => {
    if (currentSelection !== null && !selectedNumbers.includes(currentSelection)) {
      setSelectedNumbers((prev) => [...prev, currentSelection]);
      setPaymentConfirmed(true);
    }
  };

  const resetPayment = () => {
    setShowQRCode(false);
    setPaymentConfirmed(false);
    setCurrentSelection(null);
  };

  useEffect(() => {
    if (paymentConfirmed && currentSelection !== null) {
      setTimeout(() => {
        resetPayment();
      }, 3000);
    }
  }, [paymentConfirmed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 text-gray-800">
      {/* Header */}
      <header className="py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Rifa Solidária da Luzinete</h1>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Ajudando com os cuidados de Luzinete através do seu coração generoso.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Prize Image */}
          <div className="flex justify-center">
            <img
              src="https://picsum.photos/seed/eudora/400/400 "
              alt="Cesta Eudora"
              className="rounded-xl shadow-lg w-full max-w-md object-cover aspect-square transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-pink-700 mb-4">Sobre a rifa</h2>
            <p className="text-gray-700 leading-relaxed">
              Esta rifa foi criada com o objetivo de ajudar nos cuidados com Luzinete. O prêmio é uma linda cesta de cuidados Eudora,
              e cada número custa apenas R$10,00. São no total 180 números disponíveis. Após escolher um número, você gerará um QR Code para pagamento por Pix.
              Assim que confirmado o pagamento, o número ficará indisponível para outros participantes.
            </p>
          </div>
        </section>

        {/* Raffle Numbers Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center text-pink-700 mb-6">Escolha seu número</h2>
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2 md:gap-3">
            {numbersArray.map((num) => (
              <button
                key={num}
                onClick={() => handleSelectNumber(num)}
                disabled={selectedNumbers.includes(num)}
                className={`aspect-square flex items-center justify-center rounded-md font-medium transition-all duration-200 ${
                  selectedNumbers.includes(num)
                    ? "bg-gray-300 cursor-not-allowed text-gray-600 line-through"
                    : "bg-pink-100 hover:bg-pink-200 text-pink-800 hover:scale-105 active:scale-95"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Números vendidos: <span className="font-semibold">{selectedNumbers.length}</span> / {totalNumbers} - Total arrecadado: R$ {" "}
            {(selectedNumbers.length * pricePerNumber).toFixed(2)}
          </p>
        </section>

        {/* Payment Modal */}
        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all animate-fadeIn">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirme sua escolha: Número {currentSelection}
              </h3>
              <div className="mb-4 p-4 border border-dashed border-pink-400 rounded-lg bg-pink-50 text-center">
                <p className="text-sm text-gray-600">Chave Pix:</p>
                <p className="font-mono text-pink-700 break-all">311.541.888-41 (Maria José Alexandre)</p>
              </div>
              {!paymentConfirmed ? (
                <>
                  <div className="flex justify-center my-6">
                    <div className="w-40 h-40 bg-white p-4 rounded shadow-inner flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" width="200" height="200" fill="#FFFFFF"/>
                        <rect x="10" y="10" width="180" height="180" fill="#000000"/>
                        <rect x="60" y="60" width="80" height="80" fill="#FFFFFF"/>
                        <rect x="40" y="40" width="20" height="20" fill="#000000"/>
                        <rect x="140" y="40" width="20" height="20" fill="#000000"/>
                        <rect x="40" y="140" width="20" height="20" fill="#000000"/>
                        <rect x="100" y="100" width="20" height="20" fill="#000000"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mb-6">
                    Escaneie o QR Code acima ou copie a chave Pix para realizar o pagamento.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={confirmPayment}
                      className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                    >
                      Confirmar Pagamento
                    </button>
                    <button
                      onClick={resetPayment}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Pagamento confirmado!</h4>
                  <p className="text-gray-600">O número {currentSelection} está reservado para você.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} — Todos os direitos reservados à causa solidária da Luzinete.
      </footer>
    </div>
  );
}
