import React from 'react';
import {
	BoxIcon,
	CakeIcon,
	GlobeIcon,
	LockIcon,
	MailIcon,
	PenIcon,
	ShoppingBagIcon,
	StarIcon,
	VenusAndMarsIcon
} from "lucide-react";
import {toDateIndo} from "../utils/toDate.js";

export default function Dashboard() {

	return (
		<div className={'grid-cols-1'}>
			<div className="grid grid-cols-3 gap-4 ">
				<div className="col-span-2 space-y-4  ">
					<DashboardBox/>
					<DashboardUser/>
				</div>
				<DashboardAvatar/>
				<div className="col-span-1 bg-base-200"></div>
			</div>
			<DashboardTable/>
		</div>
	);
}


export function DashboardTable() {
	return (
		<div className={'card card-body card-sm bg-base-200'}>
			<h1 className={'card-title'}>Order List</h1>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
					</tr>
					</thead>
					<tbody>
					{/* row 1 */}
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
					</tr>
					{/* row 2 */}
					<tr>
						<th>2</th>
						<td>Hart Hagerty</td>
						<td>Desktop Support Technician</td>
						<td>Purple</td>
					</tr>
					{/* row 3 */}
					<tr>
						<th>3</th>
						<td>Brice Swyre</td>
						<td>Tax Accountant</td>
						<td>Red</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

	);
}


export function DashboardBox() {
	const data = {
		email   : "email@example.com",
		register: new Date()
	}
	return (
		<div className="grid-cols-2 grid gap-2 p-4 bg-base-200 rounded-box">

			<div className="bg-error rounded-box py-2  px-4 flex items-center gap-2">
				<MailIcon/>
				<div>
					<h1 className={'font-bold'}>Email</h1>
					<p>{data.email}</p>
				</div>
			</div>

			<div className="bg-warning rounded-box py-2  px-4 flex items-center gap-2">

				<PenIcon/>
				<div>
					<h1 className={'font-bold'}>Register</h1>
					<p>{toDateIndo(data.register)}</p>

				</div>
			</div>

			<div className="bg-info rounded-box py-2  px-4 flex items-center gap-2">
				<BoxIcon/>
				<div>
					<h1 className={'font-bold'}>Favorite Branch</h1>
					<p>{toDateIndo(data.register)}</p>
				</div>
			</div>

			<div className="bg-primary rounded-box py-2  px-4 flex items-center gap-2">

				<LockIcon/>
				<div>
					<h1 className={'font-bold'}>Favorite Item</h1>
					<p>{toDateIndo(data.register)}</p>
				</div>

			</div>
		</div>
	)
}


export function DashboardUser() {
	return (
		<div className="grid grid-cols-3 gap-2 p-4 bg-base-200 rounded-box">
			<div className="card card-body card-compact card-border bg-base-100 ">
				<div className="flex flex-row  justify-between items-end ">
					<StarIcon/>
					<div><h1 className={'card-title'}>Total Points</h1></div>
					<div><p className={'text-success text-lg'}>300</p></div>
				</div>

				<div className="mt-2">
					<div className="flex justify-between">
						<div><p>Points Used</p></div>
						<div><p>150</p></div>
					</div>

					<div className="flex justify-between">
						<div><p>Outstanding Point</p></div>
						<div><p>150</p></div>
					</div>
				</div>
			</div>


			<div className="card card-body card-compact card-border bg-base-100 ">
				<div className="flex flex-row  justify-between items-end ">
					<ShoppingBagIcon/>
					<div><h1 className={'card-title'}>Order </h1></div>
					<div><p className={'text-success text-lg'}>300</p></div>
				</div>
				<div className="mt-2">
					<div className="flex justify-between">
						<div><p>Total Spends</p></div>
						<div><p>150</p></div>
					</div>

					<div className="flex justify-between">
						<div><p>Average Order Value</p></div>
						<div><p>150</p></div>
					</div>
				</div>
			</div>


			<div className="card card-body card-compact card-border bg-base-100 ">
				<div className="flex flex-row  justify-between items-end ">
					<GlobeIcon/>
					<div><h1 className={'card-title'}>Total Visit</h1></div>
					<div><p className={'text-success text-lg'}>420</p></div>
				</div>

				<div className="mt-2">
					<div className="flex justify-between">
						<div><p>Last Visit</p></div>
						<div><p>{toDateIndo(new Date())}</p></div>
					</div>
					<div className="flex justify-between">
						<div><p>Spending Time</p></div>
						<div><p>5 Hours</p></div>
					</div>
				</div>
			</div>


		</div>

	);
}


export function DashboardAvatar() {
	const data = {
		gender  : "Male",
		birthDay: new Date(),
		name    : "John Doe",
		phone   : "0123456789",
	}
	return (
		<div className="card card-body bg-base-200  ">

			<div className="text-center space-y-2">
				<div className="avatar">
					<div className="w-24 rounded-full">
						<img src="https://picsum.photos/200/200" alt="image avatar"/>
					</div>
				</div>
				<h1 className={'text-2xl font-bold'}>{data.name}</h1>
				<p className={'text-base-content/60'}>{data.phone}</p>
			</div>


			<div className={'space-y-2 mt-2'}>
				<div className=" bg-base-100 rounded-box py-2  px-4 flex items-center gap-2">

					<CakeIcon/>
					<div>
						<h1 className={'font-bold'}>Birth Day</h1>
						<p>{toDateIndo(data.birthDay)}</p>
					</div>
				</div>

				<div className=" bg-base-100 rounded-box py-2  px-4 flex items-center gap-2">
					<VenusAndMarsIcon/>
					<div>
						<h1 className={'font-bold'}>Gender</h1>
						<p>{data.gender}</p>
					</div>
				</div>

			</div>
		</div>
	);
}

