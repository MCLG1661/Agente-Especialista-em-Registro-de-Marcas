// ==========================================================
// SMART
// Fluxo demonstrativo de upgrade
// Nenhuma transação financeira real é processada.
// ==========================================================


document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------------
    // CONFIGURAÇÃO DOS PLANOS
    // ------------------------------------------------------

    const prices = {
        "Básico": 0,
        "Profissional": 99.90,
        "Premium": 199.90
    };


    // ------------------------------------------------------
    // RECUPERAÇÃO DO PLANO PELA URL
    // ------------------------------------------------------

    const urlParams = new URLSearchParams(
        window.location.search
    );

    let plan = urlParams.get("plan") || "Profissional";


    // Evita parâmetros inesperados na URL.

    if (!Object.prototype.hasOwnProperty.call(prices, plan)) {
        plan = "Profissional";
    }


    const planNameElement =
        document.getElementById("plan-name");

    const planPriceElement =
        document.getElementById("plan-price");


    planNameElement.textContent = plan;

    planPriceElement.textContent =
        formatCurrency(prices[plan]);


    // ------------------------------------------------------
    // ELEMENTOS DA INTERFACE
    // ------------------------------------------------------

    const methodLabels =
        document.querySelectorAll(
            ".payment-method-label"
        );

    const paymentContents =
        document.querySelectorAll(
            ".payment-content"
        );

    const confirmButton =
        document.getElementById(
            "confirm-action-btn"
        );

    const installmentsSelect =
        document.getElementById(
            "installments"
        );

    const pixDemoButton =
        document.getElementById(
            "demo-pix-btn"
        );


    // ------------------------------------------------------
    // MÉTODO ATUAL
    // ------------------------------------------------------

    let currentMethod = "cc";


    // ------------------------------------------------------
    // ABAS DE PAGAMENTO
    // ------------------------------------------------------

    methodLabels.forEach((label) => {

        label.addEventListener("click", () => {

            const method =
                label.dataset.method;

            if (!method) {
                return;
            }

            currentMethod = method;


            methodLabels.forEach((item) => {
                item.classList.remove("active");
            });


            paymentContents.forEach((content) => {
                content.classList.remove("active");
            });


            label.classList.add("active");


            const contentMap = {
                cc: "credit-card-content",
                pix: "pix-content",
                boleto: "boleto-content"
            };


            const targetContent =
                document.getElementById(
                    contentMap[method]
                );


            if (targetContent) {
                targetContent.classList.add(
                    "active"
                );
            }


            updateActionButton(
                confirmButton,
                method
            );

        });

    });


    // ------------------------------------------------------
    // PARCELAMENTO DEMONSTRATIVO
    // ------------------------------------------------------

    populateInstallments(
        installmentsSelect,
        prices[plan]
    );


    // ------------------------------------------------------
    // PIX DEMONSTRATIVO
    // ------------------------------------------------------

    if (pixDemoButton) {

        pixDemoButton.addEventListener(
            "click",
            () => {

                alert(
                    "SMART-DEMO-PIX-000000000\n\n" +
                    "Código exclusivamente demonstrativo. " +
                    "Não realize pagamentos."
                );

            }
        );

    }


    // ------------------------------------------------------
    // CONFIRMAÇÃO DA SIMULAÇÃO
    // ------------------------------------------------------

    confirmButton.addEventListener(
        "click",
        () => {

            const methodNames = {
                cc: "Cartão",
                pix: "Pix",
                boleto: "Boleto"
            };


            const methodName =
                methodNames[currentMethod];


            const confirmed = window.confirm(
                `Simular contratação do plano ${plan} ` +
                `utilizando ${methodName}?\n\n` +
                "Nenhuma cobrança real será realizada."
            );


            if (!confirmed) {
                return;
            }


            // Registra apenas o estado demonstrativo
            // no navegador do usuário.

            localStorage.setItem(
                "smart-demo-plan",
                plan
            );


            alert(
                `Simulação concluída!\n\n` +
                `Plano demonstrativo: ${plan}\n` +
                `Método: ${methodName}\n\n` +
                "Nenhuma transação financeira foi realizada."
            );


            window.location.href =
                "index.html";

        }
    );

});


// ==========================================================
// FORMATAÇÃO DE MOEDA
// ==========================================================

function formatCurrency(value) {

    if (value === 0) {
        return "Grátis";
    }


    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================================
// PARCELAMENTO
// ==========================================================

function populateInstallments(
    selectElement,
    price
) {

    if (!selectElement) {
        return;
    }


    selectElement.innerHTML = "";


    if (price === 0) {

        const option =
            document.createElement("option");

        option.value = "1";
        option.textContent =
            "Plano gratuito";

        selectElement.appendChild(option);

        return;
    }


    for (let installments = 1;
         installments <= 12;
         installments++) {

        const installmentValue =
            price / installments;


        const option =
            document.createElement("option");


        option.value =
            installments;


        option.textContent =
            `${installments}x de ` +
            `${formatCurrency(installmentValue)}` +
            `${installments === 1 ? " (à vista)" : ""}`;


        selectElement.appendChild(option);

    }

}


// ==========================================================
// TEXTO DO BOTÃO
// ==========================================================

function updateActionButton(
    button,
    method
) {

    if (!button) {
        return;
    }


    const labels = {
        cc: "Simular Pagamento com Cartão",
        pix: "Simular Pagamento com Pix",
        boleto: "Simular Emissão de Boleto"
    };


    button.textContent =
        labels[method] ||
        "Simular Contratação";

}
