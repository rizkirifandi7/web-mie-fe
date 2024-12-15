import React from "react";
import FormRegistrasi from "./components/FormRegistrasi";
const PageRegistrasi = () => {
	return (
		<section className="md:w-full min-h-screen" id="registrasi">
			<div className="md:max-w-screen-xl mx-auto py-28 px-4 md:px-0">
				<div className="border py-4 px-6 rounded-lg">
					<h1 className="text-center text-2xl font-bold mt-4">
						Formulir Pendaftaran Kemitraan
					</h1>
					<p className="text-center text-sm mt-4 text-slate-500">
						Terima kasih atas minat Anda untuk bergabung menjadi mitra
						D’emiehan. Harap lengkapi semua informasi dengan jelas dan benar.
						Semua data yang diberikan akan dijaga kerahasiaannya sesuai dengan
						kebijakan privasi perusahaan
					</p>

					<div className="mt-10">
						<FormRegistrasi />
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageRegistrasi;
