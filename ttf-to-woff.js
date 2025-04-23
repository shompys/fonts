import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const directory = process.argv[2] || "./fonts"; // Usa el directorio actual si no se especifica

async function convertTTFtoWOFF() {
    try {
        const files = await fs.readdir(directory);
        console.log(files);
        files.forEach((file) => {
            if (file.endsWith(".ttf")) {
                const ttfPath = path.join(directory, file);
                const woffPath = path.join(
                    directory,
                    file.replace(".ttf", ".woff")
                );

                console.log(`Convirtiendo ${file}...`);

                try {
                    execSync(`npx ttf2woff "${ttfPath}" "${woffPath}"`, {
                        stdio: "inherit",
                    });
                    console.log(`✅ ${file} convertido exitosamente`);
                } catch (error) {
                    console.error(
                        `❌ Error al convertir ${file}:`,
                        error.message
                    );
                }
            }
        });

        console.log("Proceso completado");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

convertTTFtoWOFF();
