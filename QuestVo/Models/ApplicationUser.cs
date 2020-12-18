using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace QuestVo.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public List<Entry> Entries { get; set; }
    }
}
