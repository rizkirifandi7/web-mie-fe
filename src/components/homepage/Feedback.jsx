"use client";

import React from "react";
import Judul from "../Judul";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FeedbackForm from "../FeedbackForm";
import TestimoniForm from "../TestimoniForm";

const Feedback = () => {
	return (
		<section className="w-full h-full" id="feedback">
			<div className="max-w-screen-sm md:max-w-screen-xl mx-auto py-24">
				<div className="flex flex-col justify-center items-center w-full">
					<Judul mainText="D'EMIEHAN" subText="Feedback & Testimoni" />

					<Tabs
						defaultValue="feedback"
						className="flex flex-col justify-center items-center w-[380px] mx-auto md:w-1/2 mt-10"
					>
						<TabsList className="w-full">
							<TabsTrigger value="feedback" className="w-full">
								Saran Dan Kritik
							</TabsTrigger>
							<TabsTrigger value="testimoni" className="w-full">
								Testimoni
							</TabsTrigger>
						</TabsList>
						<TabsContent value="feedback" className="w-full">
							<FeedbackForm />
						</TabsContent>
						<TabsContent value="testimoni" className="w-full">
							<TestimoniForm />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
};

export default Feedback;
