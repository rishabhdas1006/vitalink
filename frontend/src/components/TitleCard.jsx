import React from "react";

const TitleCard = ({ title, children, topMargin, TopSideButtons }) => {
	return (
		<div className={"w-full p-6 shadow-md " + (topMargin || "mt-6")}>
			<div className="text-xl font-semibold">
				{title}
				{TopSideButtons && (
					<div className="inline-block float-right text-base font-light text-center">
						See by date {TopSideButtons}
					</div>
				)}
			</div>

			<div className="divider mt-2"></div>

			<div className="h-full w-full pb-6 bg-base-100">{children}</div>
		</div>
	);
};

export default TitleCard;
