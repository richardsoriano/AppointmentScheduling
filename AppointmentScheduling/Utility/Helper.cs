using System;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AppointmentScheduling.Helper
{
	public static class Helper
	{
		public static string Admin = "Admin";
		public static string Patient = "Patient";
		public static string Doctor = "Doctor";
		public static List<SelectListItem> GetRolesForDropDown()
		{
			return new List<SelectListItem>
			{
				new SelectListItem{Value=Helper.Admin, Text=Helper.Admin },
				new SelectListItem{Value=Helper.Admin, Text=Helper.Admin },
				new SelectListItem{Value=Helper.Admin, Text=Helper.Admin}
			};
		}
	}
}

